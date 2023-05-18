import cup from "../assets/icons/SuperAdminDashboard/cup-icon.svg"
import Trail from "../assets/icons/SuperAdminDashboard/trail-icon.svg"
import TrailBg from "../assets/images/SuperAdminDashboard/trail-bg.svg"
import backup from "../assets/images/SuperAdminDashboard/back-up.svg"
import fullcup from "../assets/icons/SuperAdminDashboard/full-cup.svg"

export const SuperAdmin = [
    {
        title: "Audit Trail",
        description: "Click to view Audit Trail",
        color: "#6E7191",
        imageTrail: Trail,
        imageTrailBackground: TrailBg,
        link:'/audit-logs'
    },
    {
        title: "Backup & Archive",
        description: "Click to view Backup & Archive",
        color: "#6E7191",
        imageTrail: cup,
        imageTrailBackground: TrailBg,
        backupImage: backup,
        fullCupImage: fullcup,
        link:'/backup'
    },

]

export const ActivitySessionsData = [
    {
        title: "Active Sessions",
        description: "75",
        percentageText: "12.5%",
        fromText: "From 204.234",
        color: "#4E4B66",
        formTextColor: "#6C757D",
        backgroundColorPercentageText:"#DFF1EB"

    },
    {
        title: "Page Load Time",
        description: "1.5 seconds",
        percentageText: "12.5%",
        fromText: "From 204.234",
        color: "#4E4B66",
        formTextColor: "#6C757D",
        backgroundColorPercentageText:"#DFF1EB"
    },
    {
        title: "Requests Per Minute",
        description: "57",
        percentageText: "12.5%",
        fromText: "From 204.234",
        color: "#4E4B66",
        formTextColor: "#6C757D",
        backgroundColorPercentageText:"#DFF1EB"
    },
    {
        title: "Response Time",
        description: "2.3 seconds",
        percentageText: "12.5%",
        fromText: "From 204.234",
        color: "#4E4B66",
        formTextColor: "#6C757D",
        backgroundColorPercentageText:"#DFF1EB"
    },

]
export const recentActivitiesOfEmployee=[
    {
        eventName:"New User Created",
        createdAt:"11 Nov",
        newUserDescription:"Alberto delrio created new user: John Doe  ID:0013"
    },
    {
        eventName:"Account Block",
        createdAt:"11 Nov",
        newUserDescription:"Alberto delrio created new user: John Doe  ID:0013"
    }
]