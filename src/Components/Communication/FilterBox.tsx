import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { GoSearch } from 'react-icons/go';
import { useState } from 'react';

interface FilterBoxProps {
  fix: boolean;
  category: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBox = ({
  fix,
  setKeyword,
  category,
  setCategory,
}: FilterBoxProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const questionHandler = () => {
    setCategory('QUESTION');
    setIsClicked(false);
  };

  const togetherHandler = () => {
    setCategory('TOGETHER');
    setIsClicked(false);
  };

  return (
    <section
      className={`
      ${fix && 'fixed top-0 left-0 right-0 z-40 bg-white'}
      flex items-center justify-between w-full h-20 text-center px-36`}
    >
      <div className="relative font-medium">
        <section
          className="flex items-center justify-center w-40 gap-1 text-gray-500 cursor-pointer"
          onClick={() => setIsClicked(!isClicked)}
        >
          <p className="text-lg">
            {category === 'QUESTION'
              ? '궁금해요'
              : category === 'TOGETHER'
                ? '같이해요'
                : '분류'}
          </p>
          {isClicked ? (
            <MdKeyboardArrowDown size={24} />
          ) : (
            <MdKeyboardArrowRight size={24} />
          )}
        </section>
        <section
          className={`absolute flex flex-col w-full gap-4 py-4 bg-white right-3 top-10 rounded-b-[16px] ${
            !isClicked && 'hidden'
          }`}
        >
          {category !== 'QUESTION' && (
            <p
              className="cursor-pointer hover:font-semibold hover:text-primary01"
              onClick={questionHandler}
            >
              궁금해요
            </p>
          )}

          {category !== 'TOGETHER' && (
            <p
              className="cursor-pointer hover:font-semibold hover:text-primary01"
              onClick={togetherHandler}
            >
              같이해요
            </p>
          )}
        </section>
      </div>
      <div className="relative w-2/5">
        <input
          className="w-full p-4 rounded-[16px] bg-[#F2F2F2] placeholder-[#B3B3B3] text-sm outline-none border
        focus:border-primary01 focus:bg-transparent"
          placeholder="키워드로 게시글을 검색해 주세요!"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <GoSearch
          size={24}
          className="absolute right-4 top-[15px] text-[#B3B3B3]"
        />
      </div>
    </section>
  );
};

export default FilterBox;
