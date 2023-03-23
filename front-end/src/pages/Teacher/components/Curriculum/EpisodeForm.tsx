// import NavLayout from '@layouts/NavLayout'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
// import FormHeader from '@components/japan/FormHeader'
import EpisodeFormMore from './EpisodeFormMore'
import { Button, Space } from "antd";
// import useJapanForm from '@hooks/useJapanForm'
// import useUploading from '@hooks/useUploading'

const EpisodeForm = () => {
  const { goalId } = useParams()
  const formHeaderRef = useRef()
  const formMoreRef = useRef()
  // const { onFinish, onSubmit } = useJapanForm(formHeaderRef, formMoreRef)
  // const { isDisabled } = useUploading()
  
  const onSubmit = () => {
    // console.log('formMoreRef', formMoreRef.current.getFieldsValue())
  }

  // const handleCancel = () => {

  // }

  return (
    <>
      <div className='wrapper__episode'>
        {/* < title={goalId ? 'Edit Watch Video' : 'Create Watch Video'}>*/}
        {/*<FormHeader ref={formHeaderRef} onFinish={onFinish} />*/}
        <EpisodeFormMore ref={formMoreRef} />

        <div className="px-4 pb-4 ">
          <Space >
            <button
              className='bg-[#ff2600] text-[#fff]'
              // block
              type="submit"
              color="primary"
              // size="large"
            // onClick={() => handleCancel()}
            >
              Cancel
            </button>

            <button
              className='bg-[green] text-[#fff]'
              // block
              type="submit"
              color="primary"
              // size="large"
              onClick={() => onSubmit()}
            >
              Save
            </button>
          </Space>
        </div>
      </div>

    </>
    /* </NavLayout>*/
  );
};
export default EpisodeForm;
