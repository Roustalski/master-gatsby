import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import React from "react";

function createPatchFrom(value: any) {
  return PatchEvent.from(value === "" ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
}).format;

export default function PriceInput({
  type,
  value,
  onChange,
  inputComponent,
}: any) {
  return (
    <>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ""}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
