import { Button, Card, Col, List, Row, Skeleton, Space, Statistic, Tag, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { useAuthStore } from '../store';
import { BarChartIcon } from '../components/icons/BarChart';
import BasketIcon from '../components/icons/BasketIcon';
import { Link } from 'react-router-dom';
import { ComponentType } from 'react';
const { Title, Text } = Typography;

const list = [
    {
        OrderSummary: 'Crystal Vase, Silk Scarf ...',
        address: 'Indiranagar, Bangalore',
        amount: 3500,
        status: 'packing',
        loading: false,
    },
    {
        OrderSummary: 'Luxury Watch, Perfume Set ...',
        address: 'Bandra West, Mumbai',
        amount: 8500,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Handmade Chocolates, Bouquet ...',
        address: 'Connaught Place, Delhi',
        amount: 2200,
        status: 'delivered',
        loading: false,
    },
    {
        OrderSummary: 'Personalized Mug, Photo Frame ...',
        address: 'Jubilee Hills, Hyderabad',
        amount: 1800,
        status: 'on the way',
        loading: false,
    },
    {
        OrderSummary: 'Gold Pendant, Gift Hamper ...',
        address: 'Anna Nagar, Chennai',
        amount: 12000,
        status: 'packing',
        loading: false,
    },
    {
        OrderSummary: 'Leather Wallet, Sunglasses ...',
        address: 'Park Street, Kolkata',
        amount: 4500,
        status: 'on the way',
        loading: false,
    },
];

interface CardTitleProps {
    title: string;
    PrefixIcon: ComponentType<unknown>;
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
    return (
        <Space>
            <Icon component={PrefixIcon} />
            {title}
        </Space>
    );
};

function HomePage() {
    const { user } = useAuthStore();
    return (
        <div>
            <Title level={4}>Welcome, {user?.firstName} 🎁</Title>
            <Row className="mt-4" gutter={16}>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic title="Total orders" value={52} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Total sale"
                                    value={70000}
                                    precision={2}
                                    prefix="₹"
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                                bordered={false}></Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Card
                        bordered={false}
                        title={<CardTitle title="Recent orders" PrefixIcon={BasketIcon} />}>
                        <List
                            className="demo-loadmore-list"
                            loading={false}
                            itemLayout="horizontal"
                            loadMore={true}
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item>
                                    <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            title={
                                                <a href="https://ant.design">{item.OrderSummary}</a>
                                            }
                                            description={item.address}
                                        />
                                        <Row style={{ flex: 1 }} justify="space-between">
                                            <Col>
                                                <Text strong>₹{item.amount}</Text>
                                            </Col>
                                            <Col>
                                                <Tag color="volcano">{item.status}</Tag>
                                            </Col>
                                        </Row>
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                        <div style={{ marginTop: 20 }}>
                            <Button type="link">
                                <Link to="/orders">See all orders</Link>
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default HomePage;
