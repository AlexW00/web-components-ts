## 📖 Docs

### How to: Create Components

*tldr: Extend `WebComponent` to define your own components.*

1. Create an html (and css) file for your component in a new folder
2. Create a new ts class that extends `WebComponent`
3. Use the component either in HTML or in TypeScript:
   - in HTML: `<my-component></my-component>`
   - in TypeScript: `const myComponent = new MyComponent()`
4. (don't forget to call `WebComponentLoader.loadAll().then(() => {...})` at the start of your application)

For examples, see the [ExampleWebComponent](/src/components/ExampleComponent/)

### How to: Communicate

*tldr: Communication is based on the pubSub pattern. Extend `Observable` to make your class observable, use `EventBus` for global communication.*

#### Observable

Extending `Observable` provides a class with basic pubSub functionality:
1. create a class that extends `Observable`
2. call `.addEventListener` on objects of that class to subscribe to events
3. call `notifyAll` to publish an event to all subscribers

For an example, see [Observable](/src/lib/events/Observable.ts)

#### EventBus

If you wish to send global events, you can use the `EventBus` class:
1. import the `EventBus` singleton 
2. call `.addEventListener` to subscribe to events
3. call `.notifyAll` to publish an event to all subscribers

For an example, see [EventBus](/src/lib/events/EventBus.ts)

### How to: Manage state

*tldr: Create Models to define data structures, use them via States in your Components. Use GlobalState to store globally needed States.*

#### Model

`Model` represents a basic data structure thats used in your application.
NOTE: Use State to make observe/manipulate Models. Don't use Models directly.
1. extend `Model` and define the properties of your model

For an example, see [Model](/src/data/models/ExampleModel.ts)

#### State

`State` is a wrapper class that allows you to make any existing object observable (not just Models).
1. use `new State(value)` to create a new `State` object
2. call `.addEventListener` to subscribe to changes
3. call `liveData.value` to get the current value
4. call `liveData.value = newValue` to update the value

For an example, see [State](/src/lib/state/State.ts)

#### GlobalState

`GlobalState` is a singleton, where States, which are needed in many Components, should be stored. 
That way, they can be accessed from anywhere in the application.
1. import the `GlobalState` singleton
2. use `GlobalState.addModel(model)` to add a model to the store
3. use GlobalState.findModel(), GlobalState.findModels() and GlobalState.getModelById() retrieve models from the store
4. (don't forget to call GlobalState.init() at the start of the application)

For an example, see [GlobalState](/src/lib/state/GlobalState.ts)

### How to: Get Data

*tldr: Use DataManager to fetch/save data as Models from external APIs or Databases.*

#### DataManager

`DataManager` is a singleton, in which you define functions to fetch/save Models.
1. import the `DataManager` singleton
2. use any of the `DataManager` functions to retrieve data as Models
3. (don't forget to call DataManager.init() at the start of the application)

## 🌅 Cheat Sheet

![📖 Cheat Sheet](docs/res/../../res/web-component-architecture.svg)
