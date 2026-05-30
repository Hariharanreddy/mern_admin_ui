import { Layout, Card, Space, Form, Input, Checkbox, Button, Flex, Alert, Typography, ConfigProvider, theme } from 'antd';
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from '../../components/icons/Logo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Credentials, ErrorWithResponse } from '../../types';
import { login, self, logout } from '../../http/api';
import { useAuthStore } from '../../store';
import { usePermission } from '../../hooks/usePermission';

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials);
    return data;
};

const getSelf = async () => {
    const { data } = await self();
    return data;
};

const LoginPage = () => {
    const { isAllowed } = usePermission();
    const { setUser, logout: logoutFromStore } = useAuthStore();

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false,
    });

    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: logout,
        onSuccess: async () => {
            logoutFromStore();
            return;
        },
    });

    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch();
            // logout or redirect to client ui
            // window.location.href = "http://clientui/url"
            // "admin", "manager", "customer"
            if (!isAllowed(selfDataPromise.data)) {
                logoutMutate();
                return;
            }
            setUser(selfDataPromise.data);
        },
    });

    return (
        <div className="login-container">
            {/* Drifting Background Glow Orbs */}
            <div className="glow-orb-1"></div>
            <div className="glow-orb-2"></div>
            
            <Space direction="vertical" align="center" size="large" style={{ position: 'relative', zIndex: 2 }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}>
                    <Logo textColor="#ffffff" />
                </div>
                
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#7C3AED',
                            colorLink: '#7C3AED',
                            colorSuccess: '#10B981',
                            borderRadius: 12,
                            colorBgContainer: 'rgba(15, 23, 42, 0.75)',
                            colorText: '#FFFFFF',
                            colorTextSecondary: '#94A3B8',
                        },
                        algorithm: theme.darkAlgorithm,
                    }}
                >
                    <Card
                        bordered={false}
                        className="login-card-premium"
                        style={{ width: 380 }}
                        title={
                            <Space
                                style={{
                                    width: '100%',
                                    fontSize: 16,
                                    justifyContent: 'center',
                                    paddingTop: 8,
                                    color: '#FFFFFF',
                                    fontWeight: 600,
                                }}>
                                <LockFilled style={{ color: '#7C3AED' }} />
                                Sign in
                            </Space>
                        }>
                        <Typography.Text
                            type="secondary"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                marginBottom: 24,
                                fontSize: 13,
                                color: '#94A3B8',
                            }}>
                            Sign in to your GiftHub admin account
                        </Typography.Text>
                        <Form
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={(values) => {
                                mutate({ email: values.username, password: values.password });
                            }}>
                            {isError && (
                                <Alert
                                    style={{ marginBottom: 24, borderRadius: 8 }}
                                    type="error"
                                    showIcon
                                    message={(error as unknown as ErrorWithResponse).response.data.errors[0].message}
                                />
                            )}
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email is not valid',
                                    },
                                ]}>
                                <Input
                                    size="large"
                                    prefix={<UserOutlined style={{ color: '#64748B' }} />}
                                    placeholder="Email address"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password',
                                    },
                                ]}>
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined style={{ color: '#64748B' }} />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Flex justify="space-between" align="center" style={{ marginBottom: 20 }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{ color: '#94A3B8' }}>Remember me</Checkbox>
                                </Form.Item>
                                <a href="" id="login-form-forgot" style={{ color: '#A78BFA', fontWeight: 500 }}>
                                    Forgot password
                                </a>
                            </Flex>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}
                                    loading={isPending}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </ConfigProvider>
                
                <div className="login-footer">
                    GiftHub eCommerce Admin Console • Secure Panel
                </div>
            </Space>
        </div>
    );
};

export default LoginPage;
