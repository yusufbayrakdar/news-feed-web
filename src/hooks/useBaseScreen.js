import React from "react";
import {useDispatch} from "react-redux";

import * as REDUX_ACTION_TYPES from "../redux/actionTypes";

function useBaseScreen(navigation) {
  const storeDispatch = useDispatch();

  //Redux Related
  const $ = React.useCallback(() => {
    return REDUX_ACTION_TYPES;
  }, []);

  const _dispatchAction = React.useCallback(
    (action) => {
      storeDispatch(action);
    },
    [storeDispatch]
  );

  const _dispatchActionWithType = React.useCallback(
    (type, payload) => {
      _dispatchAction({type, payload});
    },
    [_dispatchAction]
  );

  const dispatchAction = React.useCallback(
    (...args) => {
      if (!args) return;

      if (args.length === 2) {
        _dispatchActionWithType(...args);
      } else {
        if (args.length === 1) {
          if (args[0].type) {
            _dispatchAction(...args);
          } else {
            _dispatchAction({type: args[0]});
          }
        }
      }
    },
    [_dispatchAction, _dispatchActionWithType]
  );

  return {$, dispatchAction};
}

export default useBaseScreen;
