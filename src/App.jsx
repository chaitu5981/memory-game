import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import design from "./assets/design1.png";
const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [opened1, setOpened1] = useState(-1);
  const [opened2, setOpened2] = useState(-1);
  const [hidden, setHidden] = useState([]);
  const [reload, setReload] = useState(true);

  const getNumbers = () => {
    let indices = [];
    while (indices.length < 36) {
      let i = Math.ceil(Math.random() * 36);
      if (!indices.includes(i)) indices.push(i);
    }
    return indices;
  };
  useEffect(() => {
    if (opened2 !== -1 && opened1 !== -1) {
      if (numbers[opened1] === numbers[opened2]) {
        let t = setTimeout(() => {
          setHidden((prev) => [...prev, opened1, opened2]);
          setOpened1(-1);
          setOpened2(-1);
        }, 500);
      } else {
        setTimeout(() => {
          setOpened1(-1);
          setOpened2(-1);
        }, 2000);
      }
    }
  }, [opened2, opened1]);
  console.log(numbers[opened1], numbers[opened2]);
  console.log(hidden);
  const handleClick = (i) => {
    if (opened1 === -1) {
      setOpened1(i);
      return;
    } else if (opened2 === -1 && opened1 !== i) {
      setOpened2(i);
      return;
    }
  };
  useEffect(() => {
    if (reload) {
      let indices = getNumbers();
      setNumbers(indices.map((i) => (i > 18 ? i - 18 : i)));
      setReload(false);
    }
  }, [reload]);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div>
        <p className="text-2xl text-center my-6">Memory Game</p>
        {hidden.length == 36 ? (
          <button
            className="bg-blue-400 px-4 py-2 text-2xl w-[10rem] h-[4rem]"
            onClick={() => {
              setHidden([]);
              setReload(true);
            }}
          >
            Play Again
          </button>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-9 gap-3">
            {numbers.map((n, i) => (
              <div
                key={i}
                onClick={() => handleClick(i)}
                style={
                  opened1 !== i && opened2 !== i
                    ? hidden.length > 0 && hidden.includes(i)
                      ? { border: "none", backgroundColor: "white" }
                      : {
                          backgroundImage: `url(${design})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }
                    : { backgroundColor: "white", borderWidth: "2px" }
                }
                className={`w-[3rem] sm:w-[4rem] h-[4.5rem] sm:h-[6rem]  cursor-pointer  border-black flex justify-center items-center
                    ${
                      opened1 !== i && opened2 !== i
                        ? hidden.length > 0 && hidden.includes(i)
                          ? " border-0 bg-white"
                          : " drop-shadow-xl"
                        : " bg-white border-2"
                    }`}
              >
                <p
                  className={
                    (opened1 == i || opened2 == i) && !hidden.includes(i)
                      ? "text-2xl"
                      : "hidden "
                  }
                >
                  {n}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
