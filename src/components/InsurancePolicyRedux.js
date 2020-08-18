console.clear();

//People dropping off a form (Action Creator)

const createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name,
      amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name
    }
  };
};

const createClaim = (name, amountOfMoneyToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name,
      amountOfMoneyToCollect
    }
  };
};

//Reducers (Departments)

const claimHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    // we are about to take this action (FORM)
    return [...oldListOfClaims, action.payload];
  }
  //we don't care the action (Form)
  return oldListOfClaims;
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountOfMoneyToCollect;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => name !== action.payload.name);
  }
  return listOfPolicies;
};

 const { createStore,combineReducers } = Redux;

const ourDepartments = combineReducers({
  accounting : accounting,
  claimHistory:claimHistory,
  policies:policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('butikko',20));
store.dispatch(createPolicy('puifyk',30));

store.dispatch(createClaim('butikko',50));
store.dispatch(deletePolicy('butikko'));

console.log(store.getState());