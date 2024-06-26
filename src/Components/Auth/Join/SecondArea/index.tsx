import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TermsOfUse from './TermsOfUse';
import TermsOfServiceModal from '../../../AlertModal/SignupModal/RequiredFieldsModal';

const SecondArea = () => {
  const [isChecked, setIsChecked] = useState([false, false, false]);
  const [notChecked, setNotChecked] = useState([true, true, true]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const navigate = useNavigate();

  const checkedHandler = () => {
    if (isChecked.filter((c) => c === true).length === 3) {
      navigate('/auth/join/3');
    } else {
      setIsModalOpen(true);
      const newNotChecked = isChecked.map((c, index) => {
        if (!c) {
          return false;
        } else {
          return notChecked[index];
        }
      });
      setNotChecked(newNotChecked);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setIsChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-20 mt-10 px-52">
      <TermsOfUse
        title="이용약관"
        onChange={() => handleCheckboxChange(0)}
        checked={isChecked[0]}
        notChecked={notChecked[0]}
      />
      <TermsOfUse
        title="개인정보 수집 및 이용 동의"
        onChange={() => handleCheckboxChange(1)}
        checked={isChecked[1]}
        notChecked={notChecked[1]}
      />
      <TermsOfUse
        title="개인정보의 제 3자 제공 동의"
        onChange={() => handleCheckboxChange(2)}
        checked={isChecked[2]}
        notChecked={notChecked[2]}
      />
      <button
        className="w-2/3 py-4 px-12 transition bg-primary01 rounded-[20px] hover:opacity-80 text-white font-bold text-lg mb-20"
        onClick={() => checkedHandler()}
      >
        다음
      </button>
      {isModalOpen && <TermsOfServiceModal onClose={closeModal} />}
    </div>
  );
};

export default SecondArea;
