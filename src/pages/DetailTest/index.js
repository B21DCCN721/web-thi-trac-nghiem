import { CardDetailTest } from "../../components/Card";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loading from "../../components/Loading";

function DetailTest() {
  const { id } = useParams();
  const apiGetInfoTest = useGetData(`/test/info/${id}`);
  if (apiGetInfoTest.loading) {
    console.log("load");
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <CardDetailTest info={apiGetInfoTest.data} />
    </DefaultLayout>
  );
}

export default DetailTest;
