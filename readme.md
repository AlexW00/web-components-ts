# Typescript Web Components starter template

This repo contains a basic template for working with Web Components in Typescript.

## Features

Web Components allow you to create custom HTML elements that can be used in your web pages. This starter template contains a few basic features:

- ⚛️ Modular:
  - write HTML, CSS, and TypeScript in separate files
  - Models and ViewModels, keep the state separate from the DOM
- 🪶 Minimal:
  - no external dependencies, only Vite and vanilla TypeScript
- 💪 Powerful:
  - pubSub pattern for event handling and communication

## 📖 Docs

### How to: Create Components

1. Create an html (and css) file for your component in a new folder
2. Create a new ts class that extends `WebComponent`
3. Use the component either in HTML or in TypeScript:
   - in HTML: `<my-component></my-component>`
   - in TypeScript: `const myComponent = new MyComponent()`

For examples, see the [ExampleWebComponent](./src/components/ExampleComponent/)

### How to: Communicate

- communication is based on the pubSub pattern, various classes are provided to facilitate this:

#### Observable

Extending `Observable` provides a class with basic pubSub functionality:
1. create a class that extends `Observable`
2. call `.addEventListener` on objects of that class to subscribe to events
3. call `notifyAll` to publish an event to all subscribers

For an example, see [Observable](./src/events/Observable.ts)

#### EventBus

If you wish to send global events, you can use the `EventBus` class:
1. import the `EventBus` singleton 
2. call `.addEventListener` to subscribe to events
3. call `.notifyAll` to publish an event to all subscribers

For an example, see [EventBus](./src/events/EventBus.ts)

### How to: Manage state

#### Model

`Model` represents a basic data structure thats used in your application.
1. extend `Model` and define the properties of your model

For an example, see [Model](./src/data/models/ExampleModel.ts)

#### LiveData

`LiveData` is a wrapper class that allows you to make any existing object observable.
1. use `new LiveData(value)` to create a new `LiveData` object
2. call `.addEventListener` to subscribe to changes
3. call `liveData.value` to get the current value
4. call `liveData.value = newValue` to update the value

For an example, see [LiveData](./src/data/LiveData.ts)

#### ViewModel

`ViewModel` is a wrapper class that wraps any Model in a LiveData object. Use ViewModels instead of Models in your components if you want to keep the state of your component separate from the state of your application.
1. call `model.getViewModel()` to get the ViewModel instance of your model
2. use the `LiveValue` methods detailed above to get, set and listen to value changes of the Model

For an example, see [ViewModel](./src/data/ViewModel.ts)

## Usage

1. use the template to create your own repo
2. clone your repo
3. run `npm install`

### Development

1. run `npm run dev`
2. make changes to the code

### Build preview

1. run `npm run build`
2. run `npm run preview` and open the preview in a browser
