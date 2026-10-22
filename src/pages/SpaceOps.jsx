
import { useState, useEffect } from "react";
import {
    launchSatellite,
    subscribeToSatellites
} from "../services/satellites";

export default function SpaceOps() {
    const [showLaunchForm, setShowLaunchForm] = useState(false);
    const [satelliteName, setSatelliteName] = useState("");
    const [satelliteType, setSatelliteType] = useState("communications");
    const [satellites, setSatellites] = useState([]);
    const [error, setError] = useState("");
    const [launching, setLaunching] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToSatellites(
            (updatedSatellites) => {
                setSatellites(updatedSatellites);
                setError("");
            },
            (err) => {
                console.error("Firestore listener error:", err);
                setError("Could not load satellites. Check your Firestore setup and rules.");
            }
        );

        return () => unsubscribe();
    }, []);

    async function handleLaunch(event) {
        event.preventDefault();

        const name = satelliteName.trim();

        if (!name) {
            setError("Enter a satellite name.");
            return;
        }

        setLaunching(true);
        setError("");

        try {
            await launchSatellite(name, satelliteType);

            setSatelliteName("");
            setSatelliteType("communications");
            setShowLaunchForm(false);
        } catch (err) {
            console.error("Satellite launch error:", err);
            setError("Could not launch satellite. Check your Firestore configuration and rules.");
        } finally {
            setLaunching(false);
        }
    }

    return (
        <main>
            <h1>JADO Exercise</h1>
            <h2>Space Operations</h2>

            <button onClick={() => setShowLaunchForm(true)}>
                Launch Satellite
            </button>

            {showLaunchForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Launch Satellite</h2>

                        <form onSubmit={handleLaunch}>
                            <label htmlFor="satelliteName">
                                Satellite Name:
                            </label>

                            <input
                                type="text"
                                id="satelliteName"
                                value={satelliteName}
                                onChange={(event) =>
                                    setSatelliteName(event.target.value)
                                }
                                placeholder="Enter satellite name"
                                required
                            />

                            <br />
                            <br />

                            <label htmlFor="satelliteType">
                                Satellite Type:
                            </label>

                            <select
                                id="satelliteType"
                                value={satelliteType}
                                onChange={(event) =>
                                    setSatelliteType(event.target.value)
                                }
                            >
                                <option value="Communications">
                                    Communications
                                </option>
                                <option value="Reconnaissance">
                                    Reconnaissance
                                </option>
                                <option value="Navigation">
                                    Navigation
                                </option>
                                <option value="Weather">
                                    Weather
                                </option>
                            </select>

                            <br />
                            <br />

                            <button type="submit" disabled={launching}>
                                {launching ? "Launching..." : "Select"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowLaunchForm(false);
                                    setError("");
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <section>
                <h2>Launched Satellites</h2>

                {error && <p role="alert">{error}</p>}

                {satellites.length === 0 ? (
                    <p>No satellites launched yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {satellites.map((satellite) => (
                                <tr key={satellite.id}>
                                    <td>{satellite.name}</td>
                                    <td>{satellite.type}</td>
                                    <td>{satellite.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </main>
    );
}
