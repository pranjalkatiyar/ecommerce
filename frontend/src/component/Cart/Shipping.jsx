import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "./CheckoutSteps";
import { MdPinDrop } from "react-icons/md";
 import {
  MdHome,
  MdLocationCity,
  MdPublic,
  MdPhone,
  MdTransferWithinAStation,
} from "react-icons/md";
import { Country, State, City } from "country-state-city";
import "./Shipping.css";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { user } = useSelector((state) => state.user);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = React.useState(shippingInfo.address);
  const [city, setCity] = React.useState(shippingInfo.city);
  const [postalCode, setPostalCode] = React.useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = React.useState(shippingInfo.phoneNo);
  const [country, setCountry] = React.useState(shippingInfo.country);
  const [state, setState] = React.useState(shippingInfo.state);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !phoneNo || !country || !state) {
      return toast.error("Please fill all the fields");
    }

    if (phoneNo.length !== 10) {
        console.log("phoneNo.length",phoneNo.length);
      return toast.error("Please enter a valid phone number");
    }

    dispatch(saveShippingInfo({address, city, postalCode, phoneNo, country, state}));

    navigate("/order/confirm");
  };

  return (
    <>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
        </div>
        <form
          onSubmit={shippingSubmit}
          encType="multipart/form-data"
          action=""
          className="shippingForm"
        >
          <div>
            <MdHome />
            <input
              type="text"
              name=""
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id=""
            />
          </div>
          <div>
            <MdLocationCity />
            <input
              type="text"
              name=""
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id=""
            />
          </div>
          <div>
            <MdPhone />
            <input
              type="number"
              name=""
              placeholder="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              id=""
            />
          </div>
          <div>
            <MdPinDrop />
            <input
              type="number"
              name=""
              placeholder="Pin Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              id=""
            />
          </div>

          <div>
            <MdPublic />
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((c) => {
                  return (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          {country && (
            <div>
              <MdTransferWithinAStation />

              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <input
            type="submit"
            value="Continue"
            className="shippingBtn"
            disabled={state ? false : true}
          />
        </form>
      </div>
    </>
  );
};

export default Shipping;
