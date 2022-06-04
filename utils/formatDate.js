const formatDate = (date) => {
    const d = new Date(date).toLocaleDateString('fa-ir' , {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
        // year: "numeric"
    })
    return d
    // let month = `${d.getMonth() + 1}`;
    // let day = `${d.getDate()}`;
    // const year = d.getFullYear();
    //
    // if (month.length < 2) {
    //     month = `0${month}`;
    // }
    //
    // if (day.length < 2) {
    //     day = `0${day}`
    // }
    //
    // return [month, day, year].join('-')
}
export default formatDate;