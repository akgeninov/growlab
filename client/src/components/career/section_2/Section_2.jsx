import React, { useRef, useState } from "react";
import { images } from "../../../constants";
import { data } from "../../../constants";

function Section_2() {
  const title = useRef();
  const [isScroll, setIsScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = (e) => {
    if (isScroll) return;
    const currentWheelPos = e.deltaY;

    if (currentWheelPos > prevScrollPos) {
      setScrolled(true);
    } else if (currentWheelPos < prevScrollPos) {
      setScrolled(false);
    }

    setPrevScrollPos(currentWheelPos);

    setIsScroll(true);

    setTimeout(() => {
      setIsScroll(false);
    }, 500);
  };
  
  const inlineSquare = {
    width: '850px',
    height: '50px',
    backgroundColor: '#222',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  };

  const outlineSquare = {
    width: '950px',
    height: '450px',
    backgroundColor: '#444',
    borderRadius: '10px',
    position: 'relative'
  };

  const contentStyle = {
    display: 'flex',
    alignItems: 'center',  
    justifyContent: 'center',
    paddingLeft: '40px',
    paddingRight: '20px',
  };

  const imageStyle = {
    backgroundSize: 'contain',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    width: '500px',
    height: '500px',
    marginTop: '30px',
  };

  return (
    
    <div 
      onWheel={handleScroll}
      className=" relative flex flex-col  justify-start items-center  py-[80px] bg-serviceSection bg-no-repeat px-[5px] sm:px-[100px]  w-full  h-900 bg-cover  "
    >
      <div className="flex flex-col items-center justify-center gap-[16px] w-full lg:w-[564px] mb-[52px]" >
        <h1 className="text-[22px] lg:text-[40px] font-bold text-center leading-[32px] lg:leading-[60px] text-whiteSmoke500">
          Memiliki prinsip menjadikan kita tetap kompak
        </h1>
      </div>
      <div
        className="flex flex-col lg:flex-row justify-start items-center xl:justify-center shrink-0  " //mt-[30px] sm:mt-[80px] mb-[60px] lg:mb-[80px]
        style={inlineSquare}
      ></div>
      <div className style={outlineSquare}>
        <div style={contentStyle}>
          {/* Judul dan isi di sebelah kiri */}
          <h2
            className="max-w-[564px] text-[22px] lg:text-[40px] font-bold leading-[32px] lg:leading-[60px] text-whiteSmoke500"
            style={{ marginBottom: "15px" }}
          >
            Visi
          </h2>
          <p
            className="max-w-[564px] text-[14px] lg:text-[18px] font-light leading-[20px] lg:leading-[28px] text-whiteSmoke600"
            style={{ textAlign: "justify" }}
          >
            Becoming the largest platform for the growth of Indonesian MSMEs through digitization.
          </p>
          <div className="justify-center">
            <h2
              className="max-w-[564px] text-[22px] lg:text-[40px] font-bold leading-[32px] lg:leading-[60px] text-whiteSmoke500"
              style={{ marginBottom: "15px" }}
            >
              Misi
            </h2>
            <p
              className="max-w-[564px] text-[14px] lg:text-[18px] font-light leading-[20px] lg:leading-[28px] text-whiteSmoke600"
              style={{ textAlign: "justify" }}
            >
              We are the first end-to-end platform available for Indonesian MSMEs, with over 1000 MSME members spread across Indonesia. We have helped boost their business sales by 5 to 10 times through digital strategies.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1050 h-450 lg:h-[450px] rounded-lg" style={{backgroundColor:'#444'}}>
        <div 
          ref={title}
          className=" w-full  top-0 flex flex-col lg:flex-row gap-[10px] lg:gap-0 items-center lg:items-start justify-between z-10"
        >
          <div className="flex flex-col h-[250px] lg:h-[400px] w-[500px] overflow-hidden">
            {data.dataKarir.map((el, index) => (
              <div 
                key={index}
                className={`${
                  scrolled ? "-translate-y-full" : " translate-y-0"
                } gap-[52px] flex flex-col  items-center lg:items-start duration-300 min-h-[600px] `}
              >
                <div className="flex flex-col max-w-[472px] gap-[8px] lg:gap-[16px] mt-[20px] ml-[30px] mr-[30px]">
                  <h1 className=" text-whiteSmoke500 text-[22px] lg:text-[40px] text-center lg:text-start font-bold leading-[32px] lg:leading-[60px]">
                    {el.title}
                  </h1>
                  <p className="text-[16px] lg:text-[18px] font-light leading-[24px] lg:leading-[28px] text-whiteSmoke600 text-center lg:text-start">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>

                {/* <button className=" h-[54px] px-[64px] py-[16px] flex items-center rounded-[10px] justify-center bg-whiteSmoke500">
                  <p className="text-black500 text-[16px] font-medium leading-[24px]">
                    Selengkapnya
                  </p>
                </button> */}
              
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center  mx-[5px] xl:mx-0 max-w-[400px]  xl:max-w-[558px]  h-[432px] xl:h-[672px] overflow-hidden rounded-[10px]">
            {data.dataKarir.map((el, index) => (
              <div 
                key={index}
                className={`${
                  index !== 0
                    ? scrolled
                      ? "-translate-y-full opacity-100"
                      : " translate-y-0 opacity-0"
                    : scrolled
                    ? "translate-y-0 scale-95 opacity-50 "
                    : "translate-y-0 scale-100 opacity-100 "
                } flex flex-col duration-500 items-center  xl:w-[558px] rounded-[10px] min-h-[488px] xl:xl:min-h-[672px] overflow-hidden`}
              >
                <img style={imageStyle}
                  src={el.pic}
                  alt="karir"
                  className={`gap-[52px] flex flex-col  w-auto min-h-[488px]  min-w-max  xl:min-h-[400px] rounded-[10px]`}
                />
              </div>
            ))}
          </div>
        </div>
      </div> 
    </div>
  );
  // return (
  //   <div className="flex flex-col bg-serviceSection w-full 2xl:max-w-[1280px] bg-cover h-[800px] xl:h-[800px] items-center relative xl:overflow-y-visible">
  //     <div className="flex flex-col items-center justify-center mt-[80px] gap-[16px] w-full lg:w-[564px] mb-[52px]">
  //       <h1 className="text-[22px] lg:text-[40px] font-bold text-center leading-[32px] lg:leading-[60px] text-whiteSmoke500">
  //         Memiliki prinsip menjadikan kita tetap kompak
  //       </h1>
  //     </div>
  //     <div
  //       className="flex flex-col lg:flex-row justify-start items-center xl:justify-center shrink-0 "
  //       style={inlineSquare}
  //     ></div>
  //     <div className="flex" style={outlineSquare}>
  //       <div style={contentStyle}>
  //         {/* Judul dan isi di sebelah kiri */}
  //         <div>
  //           <h2 className="max-w-[564px] text-[22px] lg:text-[40px] font-bold leading-[32px] lg:leading-[60px] text-whiteSmoke500" style={{ marginBottom: '15px' }}>
  //             Semangat belajar hal <br /> 
  //             baru tanpa rasa takut
  //           </h2>
  //           <p className="max-w-[564px] text-[12px] lg:text-[18px] font-light leading-[20px] lg:leading-[28px] text-whiteSmoke600" style={{ textAlign: 'justify' }}>
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
  //             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
  //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  //           </p>
  //         </div>
  //         {/* Foto di sebelah kanan */}
  //         <div style={imageStyle}></div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Section_2;