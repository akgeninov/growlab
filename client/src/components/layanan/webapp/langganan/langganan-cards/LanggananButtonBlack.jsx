import React from "react";

function LanggananButtonBlack({ WIDTH, TEXT_BUTTON, RESPONSIF }) {
  return (
    <>
      <button
        className={`${RESPONSIF} flex-auto ${WIDTH} px-[32px] py-[16px] justify-center items-center rounded-[10px] border-[1px] text-whiteSmoke500  hover:bg-whiteSmoke800  bg-black500`}
      >

        <p className="text-whiteSmoke500 shrink-0 font-medium text-[16px] leading-[24px]">
          {TEXT_BUTTON}
        </p>
      </button>
    </>
  );
}

export default LanggananButtonBlack;
