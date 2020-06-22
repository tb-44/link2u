import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const renderFieldLarge = ({
  input,
  label,
  maxLength,
  type,
  meta: { touched, error },
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>
      {label}
      <span style={{ color: "#0073b1" }}>*</span>
    </label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-lg jodField"
        maxLength={maxLength}
      />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

const types = [
  "Full Time",
  "Part Time",
  "Contract",
  "Temporary",
  "Voluntary",
  "Internship",
];

export const renderEmploymentType = ({
  input,
  label,
  meta: { touched, error },
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>
      {label}
      <span style={{ color: "#0073b1" }}>*</span>
    </label>
    <div>
      <select {...input} className="form-control form-control-lg jodField">
        <option value="">Choose One</option>
        {types.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderJobDescription = ({
  input,
  rows,
  maxLength,
  label,
  maxlength,
  type,
  meta: { touched, error },
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>
      {label}
      <span style={{ color: "#0073b1" }}>*</span>
    </label>

    <div>
      <textarea
        {...input}
        placeholder={label}
        type={type}
        className="form-control form-control-lg jodField"
        maxLength={maxLength}
        rows={rows}
      />{" "}
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderDatePicker = ({
  input,
  label,
  placeholder,
  defaultValue,
  meta: { touched, error },
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>
      {label}
      <span style={{ color: "#0073b1" }}>*</span>
    </label>

    <div>
      <DatePicker
        {...input}
        className="form-control form-control-lg jodField "
        dateForm="MM/DD/YYYY"
        selected={input.value ? new Date(moment(input.value)) : null}
      />

      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderCheckbox = ({
  input,
  label,
  maxLength,
  type,
  meta: { touched, error },
}) => (
  <div class="form-check form-check-inline">
    <br />
    <input
      {...input}
      placeholder={label}
      type="checkbox"
      className="form-check-input"
      id="asdf"
    />{" "}
    &nbsp;&nbsp;&nbsp;&nbsp;
    <label class="form-check-label" for="asdf">
      {label} <span style={{ color: "#0073b1" }}>*</span>
    </label>
  </div>
);

const ApplicationTypes = ["Normal", "Easy Apply"];

export const renderApplicationType = ({
  input,
  label,
  meta: { touched, error },
}) => (
  <div>
    <label style={{ fontSize: "14px" }}>
      {label}
      <span style={{ color: "#0073b1" }}>*</span>
    </label>
    <div>
      <select
        {...input}
        value={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur(input.value)}
        className="form-control form-control-lg jodField"
      >
        <option value="">Choose One</option>
        {ApplicationTypes.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);
