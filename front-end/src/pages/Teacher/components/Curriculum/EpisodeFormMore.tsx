import { Form, Input, Button, Select, InputNumber, Progress, Space, Upload, Popconfirm } from 'antd'
import FormSort from './FormSort';
import React, { forwardRef, useEffect, useState } from 'react';
// import UpLoadFile from './UpLoadFile';
import { BsPlayCircle } from 'react-icons/bs';
// import Modal from './Modal';
import { useContext } from 'react';
// import { GlobalContext } from '@context/GlobalProvider';


// eslint-disable-next-line react/display-name
const EpisodeFormMore = forwardRef((props, ref) => {
  const [form] = Form.useForm()
  // useMicFormJP(form)
//   const { showModelUpload, handleShowModelUpload } = useContext(GlobalContext);


  return (
    <Form
      // @ts-ignore
      ref={ref}
      {...props}
      form={form}
      name="dynamic_form_nest_item"
      autoComplete="off"
      layout={'vertical'}
      className={'px-4 -mb-4 mt-4'}
    >
      <Form.List name="more">
        {(fields, { add, remove }) => (
          <>
            <Form.Item
              label={'Program'}
              name={`program`}
            >
              <Input />
            </Form.Item>

            <Form.List name="list">
              {(fields1, { add, remove, move }) => (
                <>
                  <FormSort.CONTAINER
                    onMove={(oldIndex: number, newIndex: number) => move(oldIndex, newIndex)}
                  >
                    {fields1.map(({ key, name, fieldKey, ...rest }) => (
                      <FormSort.ITEM key={key} index={name}>
                        <div
                          key={key}
                          className={
                            'form_sort bg-[#e0dede] relative border border-[#d9d9d9] border-dashed bg-primary-50 px-3 pb-1 pt-5 mb-3 rounded-lg'
                          }
                        >
                          <FormSort.ADD
                            obj={{ fields: fields1, move, add, name }}
                          />
                          <FormSort.DRAG />

                          <FormSort.DELETE
                            onRemove={() => {
                              remove(name)
                            }}
                          />

                          <section className="-space-y-1">
                            <div className="content_episode_container">
                              <div>
                                <Form.Item
                                  {...rest}
                                  name={[name, 'youtube_url']}
                                  label={"Youutbe URL"}
                                  rules={[{ required: true }, { type: 'url' }]}

                                >
                                  <Input placeholder="Video auto play" />
                                </Form.Item>
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/afi6dAgB1vM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                              </div>

                              <div >
                                <Form.Item
                                  {...rest}
                                  label={"Title"}
                                  name={[name, 'title']}
                                >
                                  <Input placeholder="title" />
                                </Form.Item>

                                <Form.Item
                                  {...rest}
                                  label={"Description"}
                                  name={[name, 'description']}
                                >
                                  <Input.TextArea placeholder="Description" />
                                </Form.Item>


                                <Form.Item
                                  name="upload1"
                                  label="Conversation"
                                  valuePropName="fileList"
                                // getValueFromEvent={normFile}
                                // extra="longgggggggggggggggggggggggggggggggggg"
                                >
                                  <Space>
                                    <Button /* onClick={handleShowModelUpload} */ /* icon={<BsPlayCircle />} */ >Check</Button>
                                    {/* <UpLoadFile /> */}
                                  </Space>
                                </Form.Item>
                                {/* {
                                  showModelUpload ? <Modal /> : <></>
                                } */}


                              </div>
                            </div>
                          </section>
                          {/*<MicFormJP name={name} form={form} />*/}
                        </div>
                      </FormSort.ITEM>
                    ))}
                  </FormSort.CONTAINER>


                  <Form.Item>
                    <Button
                      className={'rounded bg-primary-50 fcenter'}
                      type="dashed"
                      onClick={() => add()}
                      block
                    >
                      + Add content
                    </Button>

                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
      </Form.List>
    </Form>
  )
})

export default EpisodeFormMore
