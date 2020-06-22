import PageManager from "./page-manager";
import _ from "lodash";
import utils from "@bigcommerce/stencil-utils";
import swal from "./global/sweet-alert";
import axios from "axios";

export default class SpecialItems extends PageManager {
  onReady() {
    this.$overlay = $("[data-special-items] .loadingOverlay").hide();

    const addAllToCartBtn = document.querySelector("#addAllToCartBtn");
    const removeItemsBtn = document.querySelector("#removeItemsBtn");
    const productImg = document.querySelector(
      ".special-items .listItem-figure img"
    );

    const addAllToCart = _.bind(_.debounce(this.addAllToCart, 400), this);
    const deleteCart = _.bind(_.debounce(this.deleteCart, 400), this);

    addAllToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addAllToCart(e);
    });

    if (removeItemsBtn)
      removeItemsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let { confirmDelete } = e.currentTarget.dataset;
        swal
          .fire({
            text: confirmDelete,
            icon: "warning",
            showCancelButton: true,
          })
          .then((res) => {
            if (res.value) deleteCart(e);
          });
      });

    productImg.addEventListener("mouseenter", (e) => {
      this.swapImages(e);
    });
    productImg.addEventListener("mouseleave", (e) => {
      this.swapImages(e);
    });
  }

  swapImages(e) {
    let { origsrc, hoversrc } = e.target.dataset;
    if (e.target.getAttribute("src") === origsrc && hoversrc !== "") {
      e.target.setAttribute("src", hoversrc);
    } else {
      e.target.setAttribute("src", origsrc);
    }
  }

  async addAllToCart(e) {
    this.$overlay.show();

    let { cartId, products } = this.context;
    const { addAllItemsSuccess, addAllItemsError } = e.target.dataset;

    let cartData = {
      lineItems: products.map((product) => {
        return {
          quantity: 1,
          productId: product.id,
        };
      }),
    };

    // If cart exists add to existing cart, else create new cart
    utils.api.cart.getCart({}, async (err, res) => {
      // Set Storefront API url
      let url = "/api/storefront/carts";
      if (res) url = `/api/storefront/carts/${cartId}/items`;

      try {
        let result = await axios.post(url, cartData);
        if (result.status === 200) {
          swal.fire({
            text: addAllItemsSuccess,
            icon: "success",
            onClose: () => {
              // Bust cache and redirect
              window.location = window.location.pathname + "?itemsAdded=true";
            },
          });
        }
      } catch (err) {
        swal.fire({
          text: addAllItemsError,
          icon: "error",
        });
        this.$overlay.hide();
      }
    });
  }

  async deleteCart(e) {
    this.$overlay.show();

    const { cartId } = this.context;
    const { deleteAllSuccess, deleteAllError } = e.target.dataset;

    // If cartId exists, delete all items in cart
    if (cartId) {
      const url = `/api/storefront/carts/${cartId}`;
      try {
        let res = await axios.delete(url);
        if (res.status === 204) {
          swal.fire({
            text: deleteAllSuccess,
            icon: "success",
            onClose: () => {
              // Bust cache and redirect
              window.location = window.location.pathname + "?itemsDeleted=true";
            },
          });
        } else {
          throw new Error();
        }
      } catch (err) {
        swal.fire({
          text: deleteAllError,
          icon: "error",
        });
        this.$overlay.hide();
      }
    }
    return;
  }
}
