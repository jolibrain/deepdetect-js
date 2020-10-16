# deepdetect-js

> DeepDetect JS client

## Files

* ```src/index.js``` - client source code
* ```src/index.test.js``` - client methods tests

* ```doc/web-example/server.js``` - simple webserver to serve web-example index.html and proxy api calls to a deepdetect server
* ```doc/web-example/index.html``` - deepdetect-js web integration demo

## Usage

### Web integration

DeepDetect-JS can be used on a webpage, you probably should run deepdetect server behind a http-proxy to avoid same-origin policy issues.

A simple webserver demo is available on ```http://localhost:3000``` when running the following command:

```sh
yarn run web-example
```

Here is the simple ```/info``` api call on a DeepDetect server.
Note the ```{path: 'api'}``` parameter when initializing ```DD``` object.

```html
...
<script src="https://cdn.jsdelivr.net/npm/deepdetect-js@0.0.0-development/dist/deepdetect-browser.min.js"></script>
<script>
  async function fetchInfo() {
    const dd = new deepdetect.DD({path: 'api'});
    const info = await dd.info();
    document.getElementById('infoResult').innerHTML = JSON.stringify(info);
  }

  fetchInfo();
</script>
...
```

### NodeJS integration

Following usage examples will use nodejs, install it with this command:

```sh
npm install --save deepdetect-js
```

### Connect to DeepDetect server, and fetch informations

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

  const serviceConfig = {
    description: 'example classification service',
    model: {
      repository: '/home/me/models/example',
      templates: '../templates/caffe'
    },
    mllib: 'caffe',
    parameters: {
      input: { connector: 'txt' },
      mllib: { nclasses: 20 },
      output: {},
    },
  };

  const createService = await dd.putService(serviceName, serviceConfig)

  // Fetch service information
  const service = await dd.getService(serviceName);
  console.log(service);

  // Delete service
  const deleteService = await dd.deleteService(serviceName, {clear: 'full'});
}
```

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
  const postData = {
    service: serviceName,
    data: [ '/home/me/deepdetect/examples/all/n20/news20' ],
    parameters: {
      input: {},
      mllib: {
        gpu: false,
        net: {
          test_batch_size: 10,
        },
      },
      output: {
        measure: ['f1']
      }
    }
  };

  const predict = await dd.postPredict(postData)
  console.log(predict);

}
```

## Testing

``` yarn test ```

If you find and issue with your tests, please check the header parameters available in ```src/index.test.js```.

## Changelog

* 1.8.4 - 16/10/2020 - [Fix conditional check of options.sameOrigin](https://github.com/jolibrain/deepdetect-js/pull/13) by [eh-dub](https://github.com/eh-dub)

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/373?v=3" width="100px;"/><br /><sub><b>Alexandre Girard</b></sub>](https://github.com/alx) |
| [<img src="https://avatars3.githubusercontent.com/u/846035?v=3" width="100px;"/><br /><sub><b>Ariel Weingarten</b></sub>](https://github.com/eh-dub) |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT &copy; [Jolibrain](http://jolibrain.com)
