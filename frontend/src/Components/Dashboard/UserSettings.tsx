import UserSettingsChangePassword from "./UserSettingsChangePassword";

export default function UserSettings() {
    return (
        <main className="user-settings">
            <h1>Edit user settings</h1>
            <section className="settings-grid">
                <UserSettingsChangePassword />
            </section>
        </main>
    );
}