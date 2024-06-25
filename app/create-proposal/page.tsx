import Link from "next/link";
import { Button } from "@/app/components";
import { submitProposal } from "./actions";
import { MarkdownField, SubmitButton, Deliverables } from "./components";
import { redirect } from "next/navigation";

export default function CreateProposal() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create MRC</h1>
        <Link href="/">
          <Button text="Go Back" />
        </Link>
      </div>
      <p className="text-gray-400 my-3">
        * You have to install following{" "}
        <a
          className="text-blue-500 underline hover:text-blue-800"
          href="https://github.com/apps/weights-dashboard-poc"
          target="_blank"
        >
          github app
        </a>{" "}
        on your github account to be able to create new MRC
      </p>

      <form
        action={async (formData) => {
          "use server";
          await submitProposal(formData);
          redirect(`/`);
        }}
      >
        <div className="flex flex-col gap-4 mt-5">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-neutral-800 p-3 bg-black rounded focus:outline-none focus:border-[#179c65]"
            placeholder="Title"
            required
          />
        </div>

        {/* Select an option */}
        <div className="flex flex-col mt-5">
          <label htmlFor="mri">
            MRI Number{" "}
            <p className="text-sm text-gray-400 my-0.5 mb-2">
              To which MRI does this contribution belong?
            </p>
          </label>
          <select
            id="mri"
            name="mri"
            className="border p-3 rounded bg-black border-neutral-800 placeholder-gray-500 text-white"
          >
            <option>Choose MRI</option>
            <option value="1 - Smart Contracts on Ethereum or Arbitrum">
              1 - Smart Contracts on Ethereum or Arbitrum
            </option>
            <option value="2 - Smart Agent Tools and Examples">
              2 - Smart Agent Tools and Examples
            </option>
            <option value="3 - Morpheus Local Install Desktop / Mobile">
              3 - Morpheus Local Install Desktop / Mobile
            </option>
            <option value="4 - TCM / MOR20 Token Standard for Fair Launches">
              4 - TCM / MOR20 Token Standard for Fair Launches
            </option>
            <option value="5 - Protection Fund">5 - Protection Fund</option>
            <option value="6 - Capital Proofs Extended beyond Lido stETH">
              6 - Capital Proofs Extended beyond Lido stETH
            </option>
            <option value="7 - Compute Proofs Morpheus / Lumerin">
              7 - Compute Proofs Morpheus / Lumerin
            </option>
            <option value="8 - Code Proofs & Dashboards">
              8 - Code Proofs & Dashboards
            </option>
            <option value="9 - Frontend Proofs & Examples">
              9 - Frontend Proofs & Examples
            </option>
            <option value="10 - Interoperability">10 - Interoperability</option>
          </select>
        </div>

        <MarkdownField
          id="description"
          title="Description"
          desc="Details of MRC in markdown format"
        />

        <Deliverables />
        <SubmitButton />
      </form>
    </div>
  );
}
