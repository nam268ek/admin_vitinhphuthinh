/* eslint-disable curly */
import { Button, Collapse, Space } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_INFORMATION } from '../../constants/const';
import EditorText from '../common/EditorText';
import { getListPoliciesService, getUpdatePolicyService } from '../redux/Slices/FooterSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';

const { Panel } = Collapse;
let bodyUpdatePolicies: any = [];

export const Policy: React.FC = () => {
  const { policies, loading } = useSelector((state: RootState) => state.footer);
  const childRef = useRef<any>(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any, key: string) => {
    e.preventDefault();
    const body = bodyUpdatePolicies?.filter((item: any) => item.name === key);

    if (body?.length === 0) return;

    try {
      await dispatch(getUpdatePolicyService({ key: KEY_INFORMATION.POLICY, ...body[0] })).unwrap();
      await dispatch(getListPoliciesService()).unwrap();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  const onChange = (e: any, key: string) => {
    const data = handlePushDataToBody(cloneDeep(bodyUpdatePolicies), e, key);
    bodyUpdatePolicies = data;
  };

  const handlePushDataToBody = (body: any, value: any, key: string) => {
    const index = body.findIndex((item: any) => item.name === key);
    if (index !== -1) {
      body[index].content = value;
    } else {
      body.push({
        name: key,
        content: value,
      });
    }
    return body;
  };

  const handleReset = (e: any) => {
    e.preventDefault();
    childRef.current.resetContentEditor();
  };

  const handleActiveCollapse = (key: string | string[]) => {
    if (key instanceof Array && key.length === 0) return;

    const policy = policies?.filter((item: any) => item.name === key[0]);
    console.log(policy);
  };

  return (
    <div className="ps-main__wrapper">
      <h3 className="header-button mb-4">
        <span className="w-1/2 text-3xl font-normal">Settings</span>
      </h3>
      <div className="content">
        <section>
          <figure>
            <Space direction="vertical" className="w-full">
              {policies?.map((item) => (
                <Collapse key={item.id} collapsible="header" onChange={handleActiveCollapse}>
                  <Panel id="c-collapse-panel" header={item.desc} key={item.id}>
                    <div className="flex flex-col w-full">
                      <div>
                        <EditorText
                          defaultValue={item.content}
                          name={item.name}
                          onChange={onChange}
                          ref={childRef}
                        />
                      </div>
                      <Space className="flex justify-end mt-2 mb-2 px-2">
                        <Button type="primary" danger onClick={handleReset}>
                          Reset
                        </Button>
                        <Button
                          type="primary"
                          onClick={(e) => handleSubmit(e, item.name)}
                          loading={loading}
                        >
                          Submit
                        </Button>
                      </Space>
                    </div>
                  </Panel>
                </Collapse>
              ))}
            </Space>
          </figure>
        </section>
      </div>
    </div>
  );
};
