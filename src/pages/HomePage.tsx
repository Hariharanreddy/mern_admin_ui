import { Button, Card, Col, Empty, List, Row, Skeleton, Space, Statistic, Tag, Typography } from 'antd';
import Icon, { ShoppingOutlined, DollarOutlined, ShopOutlined, ClockCircleOutlined } from '@ant-design/icons';
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

const statusColorMap: Record<string, string> = {
    packing: 'purple',
    'on the way': 'geekblue',
    delivered: 'success',
};

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
            <Text type="secondary">Here's what's happening with your gift store today.</Text>

            <Row className="mt-4" gutter={[16, 16]}>
                {/* Stat Cards Row */}
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="stat-card-purple">
                        <Statistic
                            title="Total Orders"
                            value={52}
                            prefix={<ShoppingOutlined style={{ color: '#7C3AED' }} />}
                            suffix={
                                <Text type="success" style={{ fontSize: 13 }}>
                                    ↑ 12%
                                </Text>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="stat-card-emerald">
                        <Statistic
                            title="Total Revenue"
                            value={70000}
                            precision={2}
                            prefix={<DollarOutlined style={{ color: '#10B981' }} />}
                            suffix={
                                <Text type="success" style={{ fontSize: 13 }}>
                                    ↑ 8%
                                </Text>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="stat-card-blue">
                        <Statistic
                            title="Active Stores"
                            value={14}
                            prefix={<ShopOutlined style={{ color: '#3B82F6' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="stat-card-amber">
                        <Statistic
                            title="Pending Shipments"
                            value={7}
                            prefix={<ClockCircleOutlined style={{ color: '#F59E0B' }} />}
                        />
                    </Card>
                </Col>

                {/* Sales Chart */}
                <Col xs={24} lg={12}>
                    <Card
                        title={<CardTitle title="Sales Overview" PrefixIcon={BarChartIcon} />}
                        bordered={false}
                        style={{ minHeight: 300 }}>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <Text type="secondary">
                                    Sales chart will appear here once data is available
                                </Text>
                            }
                        />
                    </Card>
                </Col>

                {/* Recent Orders */}
                <Col xs={24} lg={12}>
                    <Card
                        bordered={false}
                        title={<CardTitle title="Recent Orders" PrefixIcon={BasketIcon} />}>
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
                                                <Text strong>₹{item.amount.toLocaleString()}</Text>
                                            </Col>
                                            <Col>
                                                <Tag color={statusColorMap[item.status] || 'default'}>
                                                    {item.status}
                                                </Tag>
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
