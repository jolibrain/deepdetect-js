# ddjs

> DeepDetect JS client

## Installation

```sh
npm install --save ddjs
```

## Files

* ```src/index.js``` - client source code
* ```src/index.test.js``` - client methods tests

## Usage

```js
import DD from 'ddjs';

async () => {

  const dd = new DD()

  // Get DeepDetect server info
  const info = await dd.info()
  console.log(info);

  // Create a service
  const serviceName = 'myserv';
  const serviceDescription = 'example classification service';
  const serviceMlLib = 'caffe';
  const serviceRepository = '/home/me/models/example';

  const createService = await dd.putService(
    serviceName,
    { repository: serviceRepository },
    { repository: serviceRepository, templates: '../templates/caffe' },
    serviceDescription,
    serviceMlLib,
    { connector: 'txt' },
    { nclasses: 20 }
  );

  const service = await dd.getService(serviceName);
  console.log(service);

  // Train
  const train = await dd.postTrain(
    serviceName,
    [ '/home/me/deepdetect/examples/all/n20/news20' ],
    {
      test_split: 0.2,
      shuffle: true,
      min_count: 10,
      min_word_length: 3,
      count: false,
    },
    {
      gpu: false,
      solver: {
        iterations: iterationsN20,
        test_interval: 200,
        base_lr: 0.05,
        snapshot: 2000,
        test_initialization: true,
      },
      net: {
        batch_size: 100,
      },
    },
    { measure: ['acc', 'mcll', 'f1'] },
    false
  );

  // Predict with measures
  const predict = await dd.postPredict(
    serviceName,
    [ '/home/me/deepdetect/examples/all/n20/news20' ],
    {},
    {
      gpu: false,
      net: {
        test_batch_size: 10,
      },
    },
    { measure: ['f1'] }
  );
  console.log(predict);


  // Delete service
  const deleteService = await dd.deleteService(serviceName, 'full');

}
```

## Testing

``` yarn test ```

If you find and issue with your tests, please check the header parameters available in ```src/index.test.js```.

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/373?v=3" width="100px;"/><br /><sub><b>Alexandre Girard</b></sub>](https://github.com/alx)<br />[💻](https://github.com/alx/deepdetect-js/commits?author=alx "Code") [📖](https://github.com/alx/deepdetect-js/commits?author=alx "Documentation") [🚇](#infra-alx "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Jolibrain](http://jolibrain.com)
