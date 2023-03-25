# JS Dynamic Methods Action

This GitHub Action allows you to dynamically call a method on a string, number, or boolean value by specifying the method name and the arguments.

The result of the method call is set as an output, and optionaly an env var.

## Inputs

- `value`: The value that will be used to instantiate a string, number, or boolean object. (required)
- `method`: The name of the method to be called on the instantiated object. (required)
- `args`: A JSON-encoded array of string representations of the arguments that will be passed to the method. These arguments will be cast to their corresponding types as specified in the `argTypes` input. (optional)
- `argTypes`: A JSON-encoded array of `ArgType` values that indicate the type of each argument in the `args` input. Supported types are: `'string'`, `'number'`, `'boolean'`, and `'regex'`. (optional)
- `type`: The type of the instantiated object. Supported types are: `'string'`, `'number'`, and `'boolean'`


## Outputs

- `result`: The result of the called method on the instantiated object.


## Usage

To use this GitHub Action in your workflow, add the following step:

```yaml
steps:
  - name: Call method on value
    uses: Swanseatom/js-dynamic-methods-action@v1
    id: js-dynamic-methods
    with:
      value: "Hello, World!"
      method: "toUpperCase"
      type: "string"

  - name: Output result
    run: echo "Result: ${{ steps.js-dynamic-methods.outputs.result }}"
```


## Example
In this example, the toUpperCase method is called on a string value, and the result is printed:

```yaml
on: [push]

jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - name: Call method on value
        uses: Swanseatom/js-dynamic-methods-action@v1
        id: js-dynamic-method
        with:
          value: "Hello, World!"
          method: "toUpperCase"
          type: "string"
          envVar: "MY_ENV_VAR"

      - name: Output result
        run: echo "Output Result: ${{ steps.js-dynamic-methods.outputs.result }}"
      - name: Output Env Var
        run: echo "Env Var Result: ${{env.MY_ENV_VAR}}"

```

When this workflow is triggered, the output will be: 

"Output Result: HELLO, WORLD!"
"Env Var Result: HELLO, WORLD!"


## License
This project is licensed under the MIT License.

