# Karlavige Demo Sales

[Karlavige Demo Sales](https://karlavige-demo-sales.mybigcommerce.com/) is a demo store using the Stencil theme engine by BigCommerce.

## Goals
* Create a "Special Items" product with two images
* Create a custom "Special Items" category template
* Develop features (second image on hover, add all to cart, remove all items, notifications)
* Show banner with customer details

## Custom Templates and Components

```
Custom Page Template Location:
/templates/pages/custom

Custom Components Location:
/templates/components/custom

Style Locations:
/assets/scss/components/stencil/category/_special-items.scss
/assets/scss/components/stencil/allToCart/_all-to-cart.scss
```
Custom templates and components were used to implement new features into the theme without overriding the existing theme. The one exception to this is the custom if statement in the base component to check if page is the special items category. If true this displays the custom header with the user info banner.

## Special Items Category Cart Buttons

Both buttons utilize the Storefront API. The Add All To Cart button button adds all items on the page into the cart. The Remove All Items displays only if the quantity of the cart is greater than 0, and removes all item from the cart.

Both buttons are visible only if products for this category exist.

## Custom JavaScript Module for Button Handlers

```
File Location:
/assets/js/theme/special-items.js
```

While it was possible to use existing classes, I decided to use the customClasses in the app.js to load a custom JavaScript module to handle the "Add All To Cart" And "Remove All Items" buttons on the Special Items category page.

The axios package is used to hit the storefront api endpoints. The Sweet Alert library is used to notify the customer if all items have been added or removed from the cart. Babel runtime was installed to support async/await on Class methods. 

## User Information Banner on Special Items Category Page

An if statement checks for the correct category page, and if true it activates the user information banner. If the user is logged in, the banner will display the user's information

## Credits

[Kyle O'Brien: Using BigCommerce Storefront APIs to Create Custom Product Display Page Experiences](https://medium.com/bigcommerce-developer-blog/using-bigcommerce-storefront-apis-to-create-custom-product-display-page-experiences-72ed3fbf7b23)