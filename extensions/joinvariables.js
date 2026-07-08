(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('SimpleAllValues must run unsandboxed');
  }

  const vm = Scratch.vm;

  class SimpleAllValues {
    getInfo() {
      return {
        id: 'simpleallvalues',
        name: 'Simple All Values',
        color1: '#4C97FF',
        color2: '#3373CC',
        color3: '#265A96',
        blocks: [
          {
            opcode: 'getAllValuesString',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all variable values as string',
            disableMonitor: true
          },
          {
            opcode: 'getAllValuesArray',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all variable values as list',
            disableMonitor: true
          }
        ]
      };
    }

    getAllValuesString() {
      const runtime = vm.runtime;
      const targets = runtime.targets;
      let result = '';
      let count = 0;

      // Loop through every sprite and the stage
      for (const target of targets) {
        const variables = target.variables;
        
        for (const id in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, id)) {
            const variable = variables[id];
            
            // Only include standard variables (type === ''), skip lists
            if (variable.type === '') {
              result += `${variable.value}\n`;
              count++;
            }
          }
        }
      }

      if (count === 0) {
        return "No variables found.";
      }

      // Remove the very last newline
      return result.slice(0, -1);
    }

    getAllValuesArray() {
      const runtime = vm.runtime;
      const targets = runtime.targets;
      const values = [];

      for (const target of targets) {
        const variables = target.variables;
        for (const id in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, id)) {
            const variable = variables[id];
            if (variable.type === '') {
              values.push(variable.value);
            }
          }
        }
      }
      
      return values;
    }
  }

  Scratch.extensions.register(new SimpleAllValues());
})(Scratch);
