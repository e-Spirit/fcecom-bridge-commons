# Connect for Commerce Bridge Commons module

This module contains the common parts required by a Connect for Commerce bridge.
All that needs to be provided in addition is the shop-specific implementation in the so called services.

Full examples of how to use this module can be found [here](https://github.com/topics/connect-for-commerce-bridge).

Further information about how to implement and use a bridge can be found in the official [documentation](https://docs.e-spirit.com/ecom/fsconnect-com/FirstSpirit_Connect_for_Commerce_Documentation_EN.html).

For more information about FirstSpirit or Connect for Commerce please use [this contact form](https://www.crownpeak.com/contact-us) to get in touch.

## How to use

1. Install the module using `npm i fcecom-bridge-commons --save`.
2. Use the module within your bridge's start file, e.g.:

```js
const bridge = BridgeCore({
  username: 'johndoe',
  password: 'password123',
  servicesDir: path.join(process.cwd(), './src/service'),
  port: 3000,
  features: {
    contentPages: true,
    categoryTree: true
  },
  useSsl: true,
  sslCert: path.join(process.cwd(), './ssl/cert.pem'),
  sslKey: path.join(process.cwd(), './ssl/cert.key')
});
```
3. Add your shop-specific code to the services directory. Make sure to follow the required structure (see below).
4. Run your bridge's start file. The server will be listening on the configured port. The Swagger UI can be accessed under http://localhost:3000/docs.

You may receive the underlying Express app instance by calling
```js
const app = bridge.getAppInstance();
```

## Configuration
|Property|Description|Required|Default|
|-|-|-|-|
|username|The username to use for Basic authentication against the bridge.|Yes||
|password|The password to use for Basic authenticaiton against the bridge.|Yes||
|servicesDir|The directory that contains the service implementations (absolute).|Yes||
|port|The port to start the bridge on.|No|3000|
|features|List of optional features that the bridge supports. See below.|No| All disabled
|useSsl|Whether to start the server using the HTTPS protocol.|No|false
|sslCert|Path to the certificate file to use when SSL is active.|If `useSsl` is `true`||
|sslKey|Path to the private key file to use when SSL is active.|If `useSsl` is `true`||


## Features
The bridges may or may not support the following features. If the feature is supported, the corresponding HEAD request will return a success. Otherwise it will return an error.

By default all optional features are assumed to be not supported.

|Feature name|Description|
|-|-|
|contentPages|The bridge can display content pages and may be able to create, update and delete them.|
|categoryTree|The bridge is able to provide the categories as a nested tree.|

## Services
The file names of the services need to match the pattern `<Controller>Service` and provide the methods mentioned below.

If a method returns an object, the property containing an array (`[]`) will be writted to the response. If it contains `total` and `hasNext`, these properties are returned in the response header (`X-Total` and `X-HasNext`).

If a method is noted to return `{ }`, the return value will be written as is.

### CategoriesService
- `async categoriesGet(parentId, lang, page)`
    - -> `{ categories: [], total: number, hasNext: boolean }`
- `async categoriesCategoryIdsGet(categoryIds, lang)`
    - -> `{ categories: [] }`
- `async categoryTreeGet(parentId, lang)` (optional)
    - -> `{ categorytree: [] }`

### ContentPagesService
- `async contentPagesContentIdDelete(contentId, lang)`
    - -> `{ }`
- `async contentPagesContentIdPut(body, lang, contentId)`
    - -> `{ }`
- `async contentPagesContentIdsGet(contentIds, lang)`
    - -> `{ contentPages: [] }`
- `async contentPagesGet(q, lang, page)`
    - -> `{ contentPages: [], total: number, hasNext: boolean }`
- `async contentPagesPost(body, lang)`
    - -> `{ }`

### MappingService
- `async lookupUrlGet(url)`
    - -> `{ }`
- `async storefrontUrlGet(type, id, lang)`
    - -> `{ }`

### ProductsService
- `async productsGet(categoryId, q, lang, page)`
    - -> `{ products: [], total: number, hasNext: boolean }`
- `async productsProductIdsGet(productIds, lang)`
    - -> `{ products: [] }`

## Legal Notices
The Connect for Commerce Bridge Commons module is a product of [Crownpeak Technology GmbH](https://www.crownpeak.com), Dortmund, Germany. The Connect for Commerce Bridge Commons module is subject to the Apache-2.0 license.

## Disclaimer
This document is provided for information purposes only. Crownpeak may change the contents hereof without notice. This document is not warranted to be error-free, nor subject to any other warranties or conditions, whether expressed orally or implied in law, including implied warranties and conditions of merchantability or fitness for a particular purpose. Crownpeak specifically disclaims any liability with respect to this document and no contractual obligations are formed either directly or indirectly by this document. The technologies, functionality, services, and processes described herein are subject to change without notice.