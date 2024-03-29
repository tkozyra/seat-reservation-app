import { Form, Input, Button, Checkbox, Row } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setNumberOfSeats } from "../../app/numberOfSeatsSlice";

const layout = {
  labelCol: {
    pull: 1,
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

const checkboxLayout = {
  wrapperCol: {
    span: 24,
  },
};

const buttonLayout = {
  wrapperCol: {
    span: 24,
  },
};

export default function ReservationForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(values.adjacent);
    dispatch(setNumberOfSeats(values));
    history.push("/wybor-miejsc");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Liczba miejsc:"
          name="numberOfSeats"
          rules={[
            {
              required: true,
              message: "Podaj liczbę miejsc!",
            },
            {
              pattern: new RegExp("^([1-9]|10)$"),
              message: "Podaj liczbę od 1 do 10!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...checkboxLayout} name="adjacent" valuePropName="checked">
          <Checkbox>Czy miejsca mają być obok siebie?</Checkbox>
        </Form.Item>

        <Form.Item {...buttonLayout}>
          <Button
            type="default"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Wybierz miejsca
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}
