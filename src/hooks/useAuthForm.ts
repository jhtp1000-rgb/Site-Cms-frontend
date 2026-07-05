import { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

export function useAuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/'); 
      } else {
        if (!formData.termsAccepted) {
          throw new Error('Você precisa aceitar os Termos de Uso.');
        }
        if (formData.password.length < 8) {
          throw new Error('A senha deve ter no mínimo 8 caracteres.');
        }

        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });

        navigate('/'); 
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso.');
      } else {
        setError(err.message || 'Ocorreu um erro ao processar a requisição.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    loading,
    error,
    formData,
    handleChange,
    toggleMode,
    handleSubmit,
  };
}