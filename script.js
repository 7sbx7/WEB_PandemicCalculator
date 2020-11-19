`use strict`;
let i = 0;
let patients = [];

function getData() {
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let actualDate = document.getElementById('actualDate').value;
    let symptomsDate = document.getElementById('symptomsDate').value;
    let quarantinePeriod = document.getElementById('quarantinePeriod').value;
    let contactDate = document.getElementById('contactDate').value;
    let incubationPeriod = document.getElementById('incubationPeriod').value;
    let infectionDay = document.getElementById('infectionDay').value;

    patients.push(new patient(firstName, lastName, actualDate, symptomsDate, quarantinePeriod, contactDate, incubationPeriod, infectionDay));

}

function convertToDays(date) {
    return (new Date(date) / 86400000);
}

function showPatient() {
    document.getElementById("display").innerHTML += '\n' + patients[i].toString();
    i += 1;
}

function showPatientConsole(i) {
    return console.log(patients[i].toStringConsole());
}

function patient(fName, lName, aDate, sDate, qPeriod, cDate, iPeriod, iDay) {
    this.firstName = fName;
    this.lastName = lName;
    this.actualDate = aDate;
    this.symptomsDate = sDate;
    this.quarantinePeriod = qPeriod;
    this.contactDate = cDate;
    this.incubationPeriod = iPeriod;
    this.infectionDay = iDay;

    this.canBeInfected = function () {
        actualDateDays = convertToDays(this.actualDate);
        symptomsDateDays = convertToDays(this.symptomsDate);
        contactDateDays = convertToDays(this.contactDate);

        // return `${this.firstName},${this.lastName},${actualDateDays},${symptomsDateDays},${this.quarantinePeriod},${contactDateDays},${this.incubationPeriod},${this.infectionDay}`
        // return (`Mogłeś sie zarazić! ${symptomsDateDays - Number(this.incubationPeriod)},${symptomsDateDays},${contactDateDays}`);

        if (contactDateDays > (symptomsDateDays - Number(this.incubationPeriod)) && contactDateDays < symptomsDateDays) {
            if (contactDateDays >= (symptomsDateDays - (10 - Number(this.infectionDay)))) {
                if (Math.round(Number(this.quarantinePeriod) - (actualDateDays - contactDateDays)) > this.quarantinePeriod) {
                    return `Minęło 14 dni od kontaktu. Jeśli nie widzisz u siebie objawów nie masz obowiązku przebywać na kwanatannie.`
                } else {
                    return `Widziałeś się w okresie zarażania. Pozostań na kwarantannie przez ${Math.round(Number(this.quarantinePeriod) - (actualDateDays - contactDateDays))} dni`
                }
            } else {
                return `widziałeś się przed okresem zarażania. Profilaktycznie ogranicz kontakt z ludźmi i obserwuj swój stan zdrowia`
            }
        } else if (contactDateDays > symptomsDateDays) {
            if (Math.round(Number(this.quarantinePeriod) - (actualDateDays - contactDateDays)) > this.quarantinePeriod || Math.round(Number(this.quarantinePeriod) - (actualDateDays - contactDateDays)) <= 0) {
                return `Minęło 14 dni od kontaktu. Jeśli nie widzisz u siebie objawów nie masz obowiązku przebywać na kwanatannie.`
            } else {
                return `Widziałeś po potwierzeniu wyniku. Pozostań na kwarantannie przez ${Math.round(Number(this.quarantinePeriod) - (actualDateDays - contactDateDays))} dni`
            }
        } else {
            return (`Nie widziałeś sie z chorym w okresie inkubacji. Jesteś bezpieczny`)
        }


    }

    this.toString = function () {
        return `<br><b> Pacjent ${this.firstName} ${this.lastName}:</b> ${this.canBeInfected()} `
    }
    this.toStringConsole = function () {
        return `Pacjent ${this.firstName} ${this.lastName}: ${this.canBeInfected()} `
    }
}

function sendData() {
    sessionStorage.clear();
    var count = patients.length;
    sessionStorage.setItem("count", count);

    for (let i = 0; i < count; i++) {
        sessionStorage.setItem(`patient${i}`, patients[i].toString())
    }
}