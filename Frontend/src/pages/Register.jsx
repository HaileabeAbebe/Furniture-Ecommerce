import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { register } from "./../redux/apiCall";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const Half = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.halfbg};
`;

const WelcomeMessage = styled.div`
  width: 70%;
  color: white;
`;

const Title = styled.h1`
  color: ${(props) => props.color};
  margin-bottom: 20px;
  padding-left: 20px;
`;

const FormContainer = styled.div`
  background-color: white;
`;

const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 350px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  outline: none;
`;

const ImagePreview = styled.img`
  border-radius: 50%;
  width: 100px;
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
`;

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("customer");
  // const [subCity, setSubCity] = useState("");
  // const [district, setDistrict] = useState();
  // const [testimonialPreviewSource, setTestimonialPreviewSource] = useState("");
  // const [testimonialImage, setTestimonialImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setProfilePicture(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // const handleTestimonialFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewTestimonialFile(file);
  //   setTestimonialImage(file);
  // };

  // const previewTestimonialFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setTestimonialPreviewSource(reader.result);
  //   };
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    // formData.append("role", role);
    // formData.append("subCity", subCity);
    // formData.append("district", district);

    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    // if (testimonialImage) {
    //   formData.append("testimonialImage", testimonialImage);
    // }

    try {
      // Convert formData to a regular object
      const formDataObj = Object.fromEntries(formData.entries());
      register(dispatch, formDataObj);
      navigate("/login");
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <Container>
      <Half halfbg="#fff">
        <FormContainer>
          <Title>CREATE YOUR ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <select name="role" onChange={(e) => setRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="cityAdmin">City Admin</option>
              <option value="subCityAdmin">Sub-City Admin</option>
              <option value="districtAdmin">District Admin</option>
              <option value="shopAgent">Shop Agent</option>
              <option value="lawEnforcement">Law Enforcement</option>
              <option value="customer">Customer</option>
            </select> */}
            {previewSource && (
              <ImagePreview
                src={previewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            )}
            <Input
              type="file"
              name="profilePicture"
              onChange={handleFileInputChange}
            />
            {/* <Input
              type="text"
              name="subCity"
              placeholder="subCity (optional)"
              onChange={(e) => setSubCity(e.target.value)}
            />
            <Input
              type="text"
              name="district"
              placeholder="district  (optional)"
              onChange={(e) => setDistrict(e.target.value)}
            />

            {testimonialPreviewSource && (
              <ImagePreview
                src={testimonialPreviewSource}
                alt="chosen"
                style={{ height: "100px" }}
              />
            )}
            <Input
              type="file"
              name="testimonialImage"
              onChange={handleTestimonialFileInputChange}
            /> */}
            <Button type="submit">Create new</Button>
          </Form>
        </FormContainer>
      </Half>
      <Half halfbg="#0f2041">
        <WelcomeMessage>
          <Title>
            Welcome to Dese Furniture We make our products in the best shape for
            your happiness{" "}
          </Title>
        </WelcomeMessage>
      </Half>
    </Container>
  );
};

export default RegistrationForm;
