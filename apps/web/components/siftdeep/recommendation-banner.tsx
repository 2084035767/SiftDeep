import { Quote, Star, Clock, Users } from 'lucide-react';

export interface Recommendation {
  id: string;
  highlight: string;
  reason?: string;
  tags?: string[];
  targetAudience?: string;
  watchTime?: string;
  isEditorPick?: boolean;
  curator: {
    username: string;
    profile?: {
      name?: string;
      profilePicture?: string;
    };
  };
  createdAt: string;
}

interface RecommendationBannerProps {
  recommendation: Recommendation;
}

export function RecommendationBanner({
  recommendation,
}: RecommendationBannerProps) {
  return (
    <div
      className={`rounded-2xl p-6 ${
        recommendation.isEditorPick
          ? 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50'
          : 'border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50'
      }`}
    >
      {/* 顶部标识 */}
      <div className="mb-4 flex items-center gap-2">
        <Quote
          className={`h-5 w-5 ${
            recommendation.isEditorPick ? 'text-blue-600' : 'text-amber-600'
          }`}
        />
        <span
          className={`font-bold ${
            recommendation.isEditorPick ? 'text-blue-800' : 'text-amber-800'
          }`}
        >
          {recommendation.isEditorPick ? '编辑精选推荐' : '推荐语'}
        </span>
      </div>

      {/* 推荐语内容 */}
      <div className="mb-6">
        <p
          className={`mb-3 text-lg font-medium ${
            recommendation.isEditorPick ? 'text-blue-900' : 'text-amber-900'
          }`}
        >
          {recommendation.highlight}
        </p>
        {recommendation.reason && (
          <p
            className={`text-sm leading-relaxed ${
              recommendation.isEditorPick ? 'text-blue-700' : 'text-amber-700'
            }`}
          >
            {recommendation.reason}
          </p>
        )}
      </div>

      {/* 标签 */}
      {recommendation.tags && recommendation.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {recommendation.tags.map((tag, index) => (
            <span
              key={index}
              className={`rounded-full px-3 py-1 text-sm ${
                recommendation.isEditorPick
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 底部信息 */}
      <div className="flex flex-wrap items-center gap-4 border-t border-gray-200/50 pt-4">
        <div className="flex items-center gap-2">
          <img
            src={
              recommendation.curator.profile?.profilePicture ||
              '/default-avatar.png'
            }
            alt={recommendation.curator.username}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-600">
            {recommendation.curator.profile?.name ||
              recommendation.curator.username}
          </span>
        </div>

        {recommendation.targetAudience && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{recommendation.targetAudience}</span>
          </div>
        )}

        {recommendation.watchTime && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{recommendation.watchTime}</span>
          </div>
        )}
      </div>
    </div>
  );
}
