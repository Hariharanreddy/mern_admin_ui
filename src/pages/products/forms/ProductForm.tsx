import { Card, Col, Form, FormInstance, Input, Row, Select, Space, Switch, Typography } from 'antd';
import { InfoCircleOutlined, PictureOutlined, ShopOutlined, SettingOutlined } from '@ant-design/icons';

import { Category, Tenant } from '../../../types';
import { useQuery } from '@tanstack/react-query';
import { getCategories, getTenants } from '../../../http/api';
import Pricing from './Pricing';
import Attributes from './Attributes';
import ProductImage from './ProductImage';
import { useAuthStore } from '../../../store';

const ProductForm = ({ form }: { form: FormInstance }) => {
    const { user } = useAuthStore();
    const selectedCategory = Form.useWatch('categoryId');
    console.log(selectedCategory);
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return getCategories();
        },
    });

    const { data: stores } = useQuery({
        queryKey: ['stores'],
        queryFn: () => {
            return getTenants(`perPage=100&currentPage=1`);
        },
    });

    return (
        <Row>
            <Col span={24}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Card title={<Space><InfoCircleOutlined />Product info</Space>} bordered={false}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <Form.Item
                                    label="Product name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Product name is required',
                                        },
                                    ]}>
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Category"
                                    name="categoryId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Category is required',
                                        },
                                    ]}>
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        allowClear={true}
                                        onChange={() => { }}
                                        placeholder="Select category">
                                        {categories?.data.map((category: Category) => (
                                            <Select.Option value={category._id} key={category._id}>
                                                {category.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Description is required',
                                        },
                                    ]}>
                                    <Input.TextArea
                                        rows={2}
                                        maxLength={100}
                                        style={{ resize: 'none' }}
                                        size="large"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                    <Card title={<Space><PictureOutlined />Product image</Space>} bordered={false}>
                        <Row gutter={20}>
                            <Col span={12}>
                                <ProductImage initialImage={form.getFieldValue('image')} />
                            </Col>
                        </Row>
                    </Card>
                    {user?.role !== 'manager' && (
                        <Card title={<Space><ShopOutlined />Store info</Space>} bordered={false}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <Form.Item
                                        label="Store"
                                        name="tenantId"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Store is required',
                                            },
                                        ]}>
                                        <Select
                                            size="large"
                                            style={{ width: '100%' }}
                                            allowClear={true}
                                            onChange={() => { }}
                                            placeholder="Select store">
                                            {stores?.data.data.map((tenant: Tenant) => (
                                                <Select.Option
                                                    value={String(tenant.id)}
                                                    key={tenant.id}>
                                                    {tenant.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    )}

                    {selectedCategory && <Pricing selectedCategory={selectedCategory} />}
                    {selectedCategory && <Attributes selectedCategory={selectedCategory} />}

                    <Card title={<Space><SettingOutlined />Other properties</Space>} bordered={false}>
                        <Row gutter={24}>
                            <Col span={24}>
                                <Space>
                                    <Form.Item name="isPublish">
                                        <Switch
                                            defaultChecked={false}
                                            onChange={() => { }}
                                            checkedChildren="Yes"
                                            unCheckedChildren="No"
                                        />
                                    </Form.Item>
                                    <Typography.Text style={{ marginBottom: 22, display: 'block' }}>
                                        Published
                                    </Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </Col>
        </Row>
    );
};

export default ProductForm;
