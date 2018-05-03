# deepdetect-js

> DeepDetect JS client

## Installation

```sh
npm install --save deepdetect-js
```

## Usage

```js
import DD from 'deepdetect-js';

const dd = new DD()

dd.info().then((err, res) => {
  console.log(res.body.status.msg) // OK
});
```

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/22868432?v=3" width="100px;"/><br /><sub>Alexandre Girard</sub>](https://github.com/alx)<br />[💻](https://github.com/alx/deepdetect-js/commits?author=alx "Code") [📖](https://github.com/alx/deepdetect-js/commits?author=alx "Documentation") [🚇](#infra-luftywiranda13 "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Alexandre Girard](http://deepdetect.com)
