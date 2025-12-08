import { Button } from '@repo/ui/button';

export default function Home() {
    return (
        <main className="container mt-5">
            <h1>Tenant Home</h1>
            <p>Welcome to the Tenant Portal</p>
            <Button variant="success">Tenant Action</Button>
        </main>
    );
}
