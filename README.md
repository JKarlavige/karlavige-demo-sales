# Karlavige Demo Sales

[Karlavige Demo Sales](https://karlavige-demo-sales.mybigcommerce.com/) is a demo store using the Stencil theme engine by BigCommerce.

## Goals
* Create a "Special Items" product with two images
* Create a custom "Special Items" category template
* Develop features (second image on hover, add all to cart, remove all items, notifications)
* Show banner with customer details

## Overview

### Custom Templates

These custom templates must be mapped for local development in the .stencil file within the "customLayouts" object. This object specifies the page type of the custom template for the server.

### Special Items Category Cart Buttons

Both buttons utilize the Storefront API. The Add All To Cart button button adds all items on the page into the cart. The Remove All Items displays only if the quantity of the cart is greater than 0.

```html
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); // jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into your JavaScript

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```
