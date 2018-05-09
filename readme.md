# deepdetect-js

> DeepDetect JS client

## Installation

```sh
npm install --save deepdetect-js
```

## Files

* ```src/index.js``` - client source code
* ```src/index.test.js``` - client methods tests

## Usage

## Connect to DeepDetect server, and fetch informations

Here is the simplest way to get information about a DeepDetect server:

```js
import DD from 'deepdetect-js';

async () => {

  const dd = new DD()

  // Get DeepDetect server info
  const info = await dd.info()
  console.log(info);

}
```

You can also specified the DeepDetect server host and port options:

```js
import DD from 'deepdetect-js';

async () => {

  const dd = new DD('10.10.10.1', 8580)

  // Get DeepDetect server info
  const info = await dd.info()
  console.log(info);

}
```

### Service API

Once connected to a DeepDetect server, the Service API allows to:

* create a service
* fetch informations about a service
* delete a service


```js
import DD from 'deepdetect-js';

async () => {

  const dd = new DD()

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

  // Fetch service information
  const service = await dd.getService(serviceName);
  console.log(service);

  // Delete service
  const deleteService = await dd.deleteService(serviceName, 'full');
}

### Train API

Once connected to a DeepDetect server, the Train API allows to:

* Create a training job
* Get information on a non-blocking training job
* Kills a non-blocking training job

```js
import DD from 'deepdetect-js';

async () => {

  const dd = new DD()
  const serviceName = 'myserv';

  // Create a training job
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

  // Get information on a non-blocking training job
  const trainingJob = await dd.getTrain(serviceName);
  console.log(trainingJob);

  // Kills a non-blocking training job
  const deletedTrainingJob = await dd.deleteTrain(serviceName);
  console.log(deletedTrainingJob);

}
```

### Predict API

Once connected to a DeepDetect server, the Predict API allows
to makes prediction from data and model

```js
import DD from 'deepdetect-js';

async () => {

  const dd = new DD()
  const serviceName = 'myserv';

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

}
```

## Testing

``` yarn test ```

If you find and issue with your tests, please check the header parameters available in ```src/index.test.js```.

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/373?v=3" width="100px;"/><br /><sub><b>Alexandre Girard</b></sub>](https://github.com/alx)<br />[💻](https://github.com/jolibrain/deepdetect-js/commits?author=alx "Code") [📖](https://github.com/jolibrain/deepdetect-js/commits?author=alx "Documentation") [🚇](#infra-alx "Infrastructure (Hosting, Build-Tools, etc)") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Jolibrain](http://jolibrain.com)
