import Lang from "~/lang/lang";
import { Helper } from "~/utils/helper";

export default function SystemRequirements() {
  const { systemRequirements: requirements } = new Helper();
  const renderSpecs = (specs: typeof requirements.minimum) =>
    Object.entries(specs).map(([key, value]) => (
      <div key={key} className="mb-4">
        <h4 className="font-semibold text-white">{key}</h4>
        <p className="text-gray-300 whitespace-pre-line">{value}</p>
      </div>
    ));

  return (
    <section className="text-white py-6 mt-6 space-y-6">
      <h2 className="text-2xl font-semibold">{Lang.system_requirements}</h2>

      <div className="bg-[#002459] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Minimum */}
        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            {Lang.minimum}
          </h3>
          {renderSpecs(requirements.minimum)}
        </div>

        {/* Recommended */}
        <div>
          <h3 className="text-lg font-semibold text-gray-400 mb-4">
            {Lang.recommanded}
          </h3>
          {renderSpecs(requirements.recommended)}
        </div>
      </div>
    </section>
  );
}
