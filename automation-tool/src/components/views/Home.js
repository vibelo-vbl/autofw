import Calendar from "../general/Calendar";
import { useEffect, useMemo } from "react";
import useRequest from "../../hooks/useRequest";
import Spinner from "../general/Spinner"


function Home() {
  const { data, isLoading, error, request } = useRequest([])
  //Modify the data receipted
  // const formatedData = useMemo(() => {
  //   const _formatedData = data.map((change) => {
  //     return { ...change, id: change.id.$oid }
  //   })
  //   return _formatedData
  // }, [data])



  const handlerOnSetdates = (datesInfo) => {
    const datestart = datesInfo.view.activeStart.toISOString().split("T")[0]
    const dateend = datesInfo.view.activeEnd.toISOString().split("T")[0]
    request(`/change/changes_range?start=${datestart}&end=${dateend}`, 'GET')
  }

  // useEffect(() => {
  //   // getChanges()

  //   console.log(datestart, dateend)
  // }, []);

  return (
    <div className="Home">
      <h1>Home!</h1>
      {isLoading ? <Spinner /> : null}
      <Calendar list_changes={data} onSetdates={handlerOnSetdates} />
    </div>
  );
}

export default Home;
