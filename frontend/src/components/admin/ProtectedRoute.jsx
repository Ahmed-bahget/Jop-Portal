const { useEffect } = require("react");
const { useSelector } = require("react-redux");
const { useNavigate } = require("react-router-dom");

const ProtectedRoute = ({children})=>{
    const {User} = useSelector(store=> store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(User === null || User.role != "recruiter"){
            navigate('/')
        }
    },[]);

    return(
        <>
        {children}
        </>
    )
};

export default ProtectedRoute;