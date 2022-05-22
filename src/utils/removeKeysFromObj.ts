const removeKeysFromObj = (keys: string[], object: any) =>
  Object.keys(object).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = object[key];
    }

    return acc;
  }, {} as { [key: string]: any });

export default removeKeysFromObj;
