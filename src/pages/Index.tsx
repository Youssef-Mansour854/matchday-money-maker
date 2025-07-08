
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ScorePredictionCard } from '@/components/ScorePredictionCard';
import { LeagueFilter } from '@/components/LeagueFilter';
import { Leaderboard } from '@/components/Leaderboard';
import { EnhancedUserStats } from '@/components/EnhancedUserStats';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { usePredictions } from '@/hooks/usePredictions';
import { footballApi } from '@/services/footballApi';
import { Match } from '@/types/match';
import { Calendar, Trophy, Target, Zap, Lock, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { addPrediction, getPrediction } = usePredictions();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        // Get matches for the next 7 days to show upcoming fixtures
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        
        const data = await footballApi.getFixtures(
          selectedLeague || undefined,
          today.toISOString().split('T')[0]
        );
        
        // Sort matches by date to show nearest matches first
        const sortedMatches = data.sort((a, b) => 
          new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
        );
        
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [selectedLeague]);

  const handlePrediction = (matchId: number, homeScore: number, awayScore: number) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    addPrediction(matchId, homeScore, awayScore);
  };

  const handleTabChange = (tab: string) => {
    if ((tab === 'stats' || tab === 'leaderboard') && !isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full mr-4">
              <Target className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">توقع المباريات</h1>
          </div>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            توقع نتائج مباريات كرة القدم واربح مكافآت مالية! 🏆
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-bold text-lg mb-2">$1 لكل توقع صحيح</h3>
                <p className="text-sm opacity-80">توقع النتيجة الصحيحة واربح</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-blue-300" />
                <h3 className="font-bold text-lg mb-2">دوريات متعددة</h3>
                <p className="text-sm opacity-80">الدوري الإنجليزي، الإسباني، الألماني وأكثر</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 mx-auto mb-3 text-green-300" />
                <h3 className="font-bold text-lg mb-2">تنافس مع الآخرين</h3>
                <p className="text-sm opacity-80">اصعد في ترتيب المتصدرين</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6 text-center">
                <Award className="w-10 h-10 mx-auto mb-3 text-purple-300" />
                <h3 className="font-bold text-lg mb-2">إنجازات وجوائز</h3>
                <p className="text-sm opacity-80">اكسب شارات الإنجاز</p>
              </CardContent>
            </Card>
          </div>
          
          {!isAuthenticated && (
            <div className="max-w-md mx-auto">
              <Button 
                onClick={() => setShowAuthModal(true)}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-xl"
              >
                ابدأ التوقع الآن
              </Button>
              <p className="text-sm mt-4 opacity-80">انضم مجاناً وابدأ في ربح المال</p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-2 mb-8 max-w-lg mx-auto border border-gray-100">
          <div className="flex space-x-1">
            {[
              { id: 'matches', label: 'المباريات', icon: Target },
              { id: 'leaderboard', label: 'المتصدرين', icon: Trophy, requiresAuth: true },
              { id: 'stats', label: 'إحصائياتي', icon: TrendingUp, requiresAuth: true }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:block">{tab.label}</span>
                {tab.requiresAuth && !isAuthenticated && (
                  <Lock className="w-3 h-3 absolute -top-1 -right-1 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        {activeTab === 'matches' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">المباريات القادمة</h2>
              <p className="text-gray-600 text-lg">توقع النتائج الصحيحة واربح $1 عن كل توقع صحيح!</p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <LeagueFilter 
                selectedLeague={selectedLeague}
                onLeagueChange={setSelectedLeague}
              />
              
              {loading ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : matches.length === 0 ? (
                <Card className="text-center py-16">
                  <CardContent>
                    <Calendar className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-600 mb-3">لا توجد مباريات</h3>
                    <p className="text-gray-500 text-lg">
                      {selectedLeague ? 'لا توجد مباريات قادمة لهذا الدوري' : 'لا توجد مباريات قادمة متاحة'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {!isAuthenticated && (
                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                      <CardContent className="p-6 text-center">
                        <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">سجل دخولك لبدء التوقع</h3>
                        <p className="text-blue-600 mb-4">انضم مجاناً وابدأ في توقع المباريات وربح المال</p>
                        <Button 
                          onClick={() => setShowAuthModal(true)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          تسجيل الدخول / إنشاء حساب
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div className="grid gap-6">
                    {matches.map((match) => (
                      <ScorePredictionCard
                        key={match.id}
                        match={match}
                        userPrediction={getPrediction(match.id)}
                        onPredict={handlePrediction}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <>
            {!isAuthenticated ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Lock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-3">سجل دخولك لرؤية المتصدرين</h3>
                  <p className="text-gray-500">
                    انضم للمنافسة وشاهد ترتيبك بين اللاعبين
                  </p>
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="mt-6 bg-green-600 hover:bg-green-700"
                  >
                    تسجيل الدخول
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Leaderboard />
            )}
          </>
        )}

        {activeTab === 'stats' && (
          <>
            {!isAuthenticated ? (
              <Card className="text-center py-16">
                <CardContent>
                  <Lock className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-3">سجل دخولك لرؤية إحصائياتك</h3>
                  <p className="text-gray-500">
                    تابع أداءك وإنجازاتك في التوقعات
                  </p>
                  <Button 
                    onClick={() => setShowAuthModal(true)}
                    className="mt-6 bg-green-600 hover:bg-green-700"
                  >
                    تسجيل الدخول
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <EnhancedUserStats />
            )}
          </>
        )}
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Index;
