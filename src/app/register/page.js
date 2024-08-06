'use client';

import InputComponent from '@/components/FormElements/InputComponent';
import SelectComponent from '@/components/FormElements/SelectComponent';
import { registerNewUser } from '@/services/register';
import { registrationFormControls } from '@/utils';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context';
import Notifications from '@/components/Notifications';
import ComponentLevelLoader from '@/components/Loader/componentLevel';
import { toast } from 'react-toastify';
import Footer from '@/components/Footer';

const initailFormData = {
  name: '',
  email: '',
  username: '',
  address: '',
  state: '',
  country: '',
  password: '',
  phone: '',
  role: 'admin',
};

export default function Register() {
  const [formData, setFormData] = useState(initailFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser } =
    useContext(GlobalContext);
  const router = useRouter();

  console.log(formData);

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== '' &&
      formData.username &&
      formData.username.trim() !== '' &&
      formData.address &&
      formData.address.trim() !== '' &&
      formData.state &&
      formData.state.trim() !== '' &&
      formData.country &&
      formData.country.trim() !== '' &&
      formData.email &&
      formData.email.trim() !== '' &&
      formData.password &&
      formData.password.trim() !== '' &&
      formData.phone &&
      formData.phone.trim() !== ''
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);
    console.log(data);
    console.log(data?.success);
    if (data?.success) {
      toast.success(data.message, {
        position: "top-right",
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initailFormData);
    } else {
      toast.error(data.message, {
        position: "top-right",
      });
      setPageLevelLoader(false);
      setFormData(initailFormData);
    }
  }

  useEffect(() => {
    if (isAuthUser) router.push('/dashboard');
  }, [isAuthUser]);

  return (
    <>
      <div className="bg-[#ddd] relative pb-20">
        <div className='relative h-[50vh] md:h-[80vh] overflow-hidden mb-10'>
          <div className='absolute top-0 left-0 w-full h-full'>
            <img src='https://leadassetmarket.com/site-images/WZMH-Architects-National-Bank-Trading-Floor-Toronto.jpg' alt='about' className='object-cover w-full h-full' />
            <div className="absolute inset-0 bg-[#1567bed5] opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center flex flex-col max-w-3xl gap-4 items-center">
                <h3 className="text-4xl font-bold">CREATE AN ACCOUNT</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between py-0 px-6 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full lg:flex-row">
            <div className="w-full mt-4 mb-10 mr-0 ml-0 relative max-w-3xl lg:mt-24 lg:w-5/12">
              <div className="flex flex-col items-center justify-start px-3 py-10 bg-white shadow-xl rounded-xl relative z-10">
                <p className="text-[#007bff] w-full text-2xl font-semibold text-center">
                  {isRegistered ? (
                    <span className="text-green-60">
                      Account created successfully!
                    </span>
                  ) : (
                    'Create an Account'
                  )}
                </p>
                {isRegistered ? (
                  <button
                    onClick={() => router.push('/login')}
                    className="disabled:opacity-50 inline-flex w-fit items-center justify-center bg-[#007bff] px-5 py-2 text-base tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md mt-4"
                  >
                    Goto Login Now
                  </button>
                ) : (
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-6">
                    {registrationFormControls.map((controlItem) =>
                      controlItem.componentType === 'input' ? (
                        <InputComponent
                          key={controlItem.id}
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: e.target.value,
                            });
                          }}
                          value={formData[controlItem.id]}
                        />
                      ) : null
                    )}
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-center mt-3">
                        On signing up, means you&apos;ve accepted our Terms of
                        Service and Privacy Policy.
                      </p>
                      <button
                        className="disabled:opacity-50 inline-flex items-center justify-center bg-[#007bff] px-5 py-2 text-base tracking-wide text-white transition-all ease-in-out duration-200 font-medium focus:shadow rounded-md mt-4 w-full"
                        disabled={!isFormValid()}
                        onClick={handleRegisterOnSubmit}
                      >
                        {pageLevelLoader ? (
                          <ComponentLevelLoader
                            text={'Registering'}
                            color={'#fff'}
                            loading={pageLevelLoader}
                          />
                        ) : (
                          'Register'
                        )}
                      </button>
                      <p className="text-sm text-black text-center mt-3">
                        Already have an account?{' '}
                        <a
                          href="/login"
                          className="text-[#007bff] font-semibold underline cursor-pointer"
                        >
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Notifications />
      </div>
      <Footer />
    </>
  );
}
