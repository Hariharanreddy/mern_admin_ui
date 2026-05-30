import { Card, Col, Form, Input, Row } from 'antd';

type TenantsFilterProps = {
    children?: React.ReactNode;
};
const TenantFilter = ({ children }: TenantsFilterProps) => {
    return (
        <Card bodyStyle={{ padding: '16px 24px' }}>
            <Row justify="space-between" align="middle">
                <Col span={16}>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item name="q" style={{ marginBottom: 0 }}>
                                <Input.Search allowClear={true} placeholder="Search" />
                            </Form.Item>
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

export default TenantFilter;
