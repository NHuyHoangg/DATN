export const sendAddRequest = () => {
  return async (dispatch) => {
    const sendAddData = async () => {
      // call API logic
    };

    try {
      const response = await sendAddInfor();
      // perform sucessful UI logic
    } catch (err) {
      // perform failed UI logic
    }
  };
};

export const sendRemoveRequest = () => {
  return async (dispatch) => {
    const sendRemoveData = async () => {
      // call API logic
    };

    try {
      const response = await sendRemoveData();
      // perform sucessful UI logic
    } catch (err) {
      // perform failed UI logic
    }
  };
};
