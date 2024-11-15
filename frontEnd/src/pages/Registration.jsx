import { useReducer, useState } from "react";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";

const initialState = {
  fullName: "",
  password: "",
  contactPerson: "",
  companyName: "",
  phoneNumber: "",
  personChecked: false,
  companyChecked: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setFullName":
      return { ...state, fullName: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };

    case "setPhoneNumber":
      return { ...state, phoneNumber: action.payload };
    case "setPerson":
      return { ...state, personChecked: action.payload };
    case "setCompany":
      return { ...state, companyChecked: action.payload };
    case "setCompanyName":
      return { ...state, companyName: action.payload };
    case "setContactPerson":
      return { ...state, contactPerson: action.payload };
    default:
      return state;
  }
};
function Registration() {
  const [
    {
      fullName,
      password,
      email,
      personChecked,
      companyChecked,
      phoneNumber,
      companyName,
      contactPerson,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  const handlePersonChecked = () => {
    dispatch({ type: "setPerson", payload: true });
    if (!personChecked) {
      setUserType("person");
      dispatch({ type: "setCompany", payload: false });
    } else {
      setUserType("");
    }
  };

  const handleCompanyChecked = () => {
    dispatch({ type: "setCompany", payload: true });
    if (!companyChecked) {
      setUserType("company");
      dispatch({ type: "setPerson", payload: false });
    } else {
      setUserType("");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (userType === "person") {
      const newUser = { fullName, email, password, phoneNumber, userType };
      console.log(newUser);
    }
    if (userType === "company") {
      const newUser = {
        companyName,
        contactPerson,
        email,
        password,
        phoneNumber,
        userType,
      };
      console.log(newUser);
    }
    navigate("/");
  }
  console.log(userType);
  console.log(personChecked);
  console.log(companyChecked);
  return (
    <main>
      <div className="bg-light w-[40%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
        <h2 className="text-[2.4rem] font-bold">Create your account</h2>
        <form
          className="registerForm flex flex-col gap-[5rem] w-[50%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
          <div className="input-group flex flex-col gap-[3rem]">
            <label htmlFor="userType">Which one are you?</label>
            <div className="flex items-center gap-[2rem]">
              <div>
                <input
                  type="checkbox"
                  id="role1"
                  onChange={() => handlePersonChecked()}
                />
                <label htmlFor="role1" className="ml-[5px]">
                  Person
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="role2"
                  onChange={() => handleCompanyChecked()}
                />
                <label htmlFor="role2" className="ml-[5px]">
                  Company
                </label>
              </div>
            </div>
          </div>
          {companyChecked && (
            <input
              className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) =>
                dispatch({ type: "setCompanyName", payload: e.target.value })
              }
            />
          )}
          {companyChecked && (
            <input
              className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
              type="text"
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) =>
                dispatch({ type: "setContactPerson", payload: e.target.value })
              }
            />
          )}
          {personChecked && (
            <input
              className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                dispatch({ type: "setFullName", payload: e.target.value })
              }
            />
          )}
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
          />
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
          />
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              dispatch({ type: "setPhoneNumber", payload: e.target.value })
            }
          />
          <button
            type="submit"
            className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
          >
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}

export default Registration;
