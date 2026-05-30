import { useQuery } from '@tanstack/react-query';
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd';
import { getCategories, getTenants } from '../../http/api';
import { Category, Tenant } from '../../types';
import { useAuthStore } from '../../store';

type ProductsFilterProps = {
    children?: React.ReactNode;
};

const ProductsFilter = ({ children }: ProductsFilterProps) => {
    const { user } = useAuthStore();
    const { data: stores } = useQuery({
        queryKey: ['stores'],
        queryFn: () => {
            return getTenants(`perPage=100&currentPage=1`);
        },
    });

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },
    });
    return (
        <Card bodyStyle={{ padding: '16px 24px' }}>
            <Row justify="space-between" align="middle">
                <Col span={16}>
                    <Row gutter={20} align="middle">
                        <Col span={6}>
                            <Form.Item name="q" style={{ marginBottom: 0 }}>
                                <Input.Search allowClear={true} placeholder="Search" />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item name="categoryId" style={{ marginBottom: 0 }}>
                                <Select
                                    style={{ width: '100%' }}
                                    allowClear={true}
                                    placeholder="Select category">
                                    {categories?.data.map((category: Category) => {
                                        return (
                                            <Select.Option key={category._id} value={category._id}>
                                                {category.name}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        {user!.role === 'admin' && (
                            <Col span={6}>
                                <Form.Item name="tenantId" style={{ marginBottom: 0 }}>
                                    <Select
                                        style={{ width: '100%' }}
                                        allowClear={true}
                                        placeholder="Select store">
                                        {stores?.data.data.map((store: Tenant) => {
                                            return (
                                                <Select.Option
                                                    key={store.id}
                                                    value={store.id}>
                                                    {store.name}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        )}

                        <Col span={6}>
                            <Space align="center">
                                <Form.Item name="isPublish" style={{ marginBottom: 0 }}>
                                    <Switch defaultChecked={false} onChange={() => { }} />
                                </Form.Item>
                                <Typography.Text>
                                    Show only published
                                </Typography.Text>
                            </Space>
                        </Col>
                    </Row>
                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                    {children}
                </Col>
            </Row>
        </Card>
    );
};

export default ProductsFilter;
