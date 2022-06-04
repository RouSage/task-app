const removeKeysFromObj = (keys: string[], object: Record<string, any>) =>
  Object.keys(object).reduce((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = object[key];
    }

    return acc;
  }, {} as Record<string, any>);

export default removeKeysFromObj;
