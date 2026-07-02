import { Activity } from "../models/activity.model.js"
import { VisitorInfo } from "../models/visitorInfo.model.js"

// COUNT ON VISIT
export const visitCount = async (req, res) => {
    try {
        const activity = await Activity.findOneAndUpdate(
            {},
            {
                $inc: {
                    visitCount: 1,
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json({
            message: "Count increased.",
            visitCount: activity.visitCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// COUNT ON RESUME BUTTON CLICK
export const resumeButtonCount = async (req, res) => {
    try {
        const activity = await Activity.findOneAndUpdate(
            {},
            {
                $inc: {
                    resumeClickCount: 1
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json({
            message: "Count increased.",
            resumeClickCount: activity.resumeClickCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// COUNT ON HIRE BUTTON CLICK
export const hireButtonCount = async (req, res) => {
    try {
        const activity = await Activity.findOneAndUpdate(
            {},
            {
                $inc: {
                    hireClickCount: 1
                },
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json({
            message: "Count increased.",
            hireClickCount: activity.hireClickCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//CREATE VISITOR INFO
export const visitorInfo = async (req, res) => {
    try {
        const ip = req.ip
        console.log("Visitor's ip is: " + ip)
        console.log("req.ip:", req.ip);
        console.log("x-forwarded-for:", req.headers["x-forwarded-for"]);
        let location = {};

        try {
            if (ip && ip !== "::1" && ip !== "127.0.0.1") {
                const response = await fetch(`http://ip-api.com/json/${ip}`);
                const data = await response.json();

                if (data.status === "success") {
                    location = data;
                }
            }
        } catch (error) {
            console.log("GeoIP Error:", error.message);
        }
        // console.log(location);

        const {
            visitorBrowser,
            visitorOS,
            visitorDevice,
            visitorSource,
            visitorSpentTime,
        } = req.body;

        if (
            !visitorBrowser ||
            !visitorOS ||
            !visitorDevice ||
            !visitorSource
        ) {
            return res.status(400).json({
                message: "Visitor data is required",
            });
        }

        const visitorsInfo = await VisitorInfo.create({
            visitorBrowser,
            visitorOS,
            visitorDevice,
            visitorSource,
            visitorCity: location?.city,
            visitorRegion: location?.regionName,
            visitorCountry: location?.country,
            visitorISP: location?.isp,
            visitorORG: location?.org
        });

        res.status(201).json({
            message: "Visitor info created.",
            visitorInfo: visitorsInfo,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



// GET VISITOR INFO
export const getAnalytics = async (req, res) => {
    try {
        const visitorsInfo = await VisitorInfo.find()
        const dataCount = await VisitorInfo.countDocuments()
        console.log(dataCount)
        if (!visitorsInfo) return res.status(404).json({ message: "Visitor info not found." })

        // res.status(200).json({ visitorInfo: visitorsInfo })
        res.render('analytics', {
            visitCount: 0, resumeCount: 0, visitors: visitorsInfo
        })
        // console.log(visitorsInfo?.createdAt)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const resetAnalytics = async (req, res) => {
    try {
        const visitorsInfo = await VisitorInfo.deleteMany({})
        // res.status(200).json({ message: "Visitors info deleted." })
        res.redirect('/api/analytics')

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
