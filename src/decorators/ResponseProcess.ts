export function ResponseProcess() {
    return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
      const method = descriptor.value;
      descriptor.value = async function() {
        // @ts-ignore
        const res = await method.apply(this, arguments);
        if (res.code !== 0 && res.code !== 200) {
          const errMsg = `Server Response Error: ${JSON.stringify(res, null, 2)}`
          console.log('err ', errMsg)

          throw new Error(errMsg)
        }
        return res;
      };
      Object.defineProperty(descriptor.value, 'name', {value: method.name});
    };
  }