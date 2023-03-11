import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleToggle = async (e, boolean) => {
  e.preventDefault();
  setState(e.currentTarget);
  setState(boolean);
};

const viewProfile = () => {
  console.log('viewProfile');
};

const editProfile = () => {
  console.log('editProfile');
};

